import { ReloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Col, DatePicker, Empty, Row, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DataOverview from './components/DataOverview';
import SalesChart from './components/SalesChart';
import StoreRanking from './components/StoreRanking';
import { getDashboardData } from './service';
import type { DashboardData, DashboardQueryParams } from './types';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [filterType, setFilterType] =
    useState<DashboardQueryParams['filterType']>('day');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDashboardData({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
        filterType,
      });
      setData(result);
    } catch (err) {
      setError('获取数据失败，请稍后重试');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, filterType]);

  const handleRefresh = () => {
    fetchData();
  };

  if (error) {
    return (
      <PageContainer>
        <Alert
          message="数据加载失败"
          description={error}
          type="error"
          showIcon
          action={
            <button type="button" onClick={handleRefresh}>
              <ReloadOutlined /> 重试
            </button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: '数据分析',
        subTitle: '查看关键业务指标和趋势分析',
        extra: [
          <RangePicker
            key="date-range"
            value={dateRange}
            onChange={setDateRange}
            allowClear={false}
          />,
          <Select
            key="filter-type"
            value={filterType}
            onChange={setFilterType}
            style={{ width: 120 }}
          >
            <Option value="day">按日</Option>
            <Option value="week">按周</Option>
            <Option value="month">按月</Option>
            <Option value="year">按年</Option>
          </Select>,
          <button key="refresh" type="button" onClick={handleRefresh}>
            <ReloadOutlined /> 刷新
          </button>,
        ],
      }}
    >
      <Spin spinning={loading}>
        {!data && !loading ? (
          <Empty description="暂无数据" />
        ) : (
          <>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <DataOverview data={data?.dataOverview} loading={loading} />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <SalesChart data={data?.salesData} loading={loading} />
              </Col>
              <Col span={8}>
                <StoreRanking data={data?.storeRanking} loading={loading} />
              </Col>
            </Row>
          </>
        )}
      </Spin>
    </PageContainer>
  );
};

export default DashboardAnalysis;
