import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, DatePicker, Empty, Radio, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DataCard from './components/DataCard';
import SalesChart from './components/SalesChart';
import StoreRanking from './components/StoreRanking';
import { fetchDashboardDataMock } from './service';

const { RangePicker } = DatePicker;

type DateGranularity = 'day' | 'month' | 'year';

interface DashboardData {
  totalSales: {
    total: number;
    weekOverWeek: number;
    dayOverDay: number;
    daily: number;
  };
  visits: {
    total: number;
    daily: number;
  };
  paymentCount: {
    total: number;
    conversionRate: number;
  };
  salesData: Array<{
    date: string;
    value: number;
  }>;
  storeRanking: Array<{
    name: string;
    sales: number;
    rank: number;
  }>;
}

const Analysis: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [granularity, setGranularity] = useState<DateGranularity>('day');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDashboardDataMock({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
        granularity,
      });
      setData(response);
    } catch (_err) {
      setError('加载数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange, granularity]);

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  const handleGranularityChange = (e: any) => {
    setGranularity(e.target.value);
  };

  if (error) {
    return (
      <PageContainer>
        <Alert
          message="加载失败"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Card
          title="数据概览"
          extra={
            <RangePicker
              value={dateRange}
              onChange={handleDateChange}
              allowClear={false}
            />
          }
          style={{ marginBottom: 24 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <DataCard
                title="总销售额"
                value={data?.totalSales.total || 0}
                extra={[
                  {
                    label: '周同比',
                    value: data?.totalSales.weekOverWeek || 0,
                  },
                  { label: '日同比', value: data?.totalSales.dayOverDay || 0 },
                  { label: '日销售额', value: data?.totalSales.daily || 0 },
                ]}
                loading={loading}
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DataCard
                title="访问量"
                value={data?.visits.total || 0}
                extra={[{ label: '日访问量', value: data?.visits.daily || 0 }]}
                loading={loading}
                prefix=""
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <DataCard
                title="支付笔数"
                value={data?.paymentCount.total || 0}
                extra={[
                  {
                    label: '转化率',
                    value: data?.paymentCount.conversionRate || 0,
                    suffix: '%',
                  },
                ]}
                loading={loading}
                prefix=""
              />
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              title="销售额趋势"
              extra={
                <Radio.Group
                  value={granularity}
                  onChange={handleGranularityChange}
                  size="small"
                >
                  <Radio.Button value="day">日</Radio.Button>
                  <Radio.Button value="month">月</Radio.Button>
                  <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
              }
              style={{ height: '100%' }}
            >
              {data?.salesData && data.salesData.length > 0 ? (
                <SalesChart data={data.salesData} />
              ) : (
                <Empty description="暂无数据" />
              )}
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="门店销售排名" style={{ height: '100%' }}>
              {data?.storeRanking && data.storeRanking.length > 0 ? (
                <StoreRanking data={data.storeRanking} />
              ) : (
                <Empty description="暂无数据" />
              )}
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageContainer>
  );
};

export default Analysis;
