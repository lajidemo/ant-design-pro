import { CalendarOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Card, Col, DatePicker, Row, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useCallback, useMemo } from 'react';
import {
  getSalesChart,
  getStoreRank,
  type SalesChartItem,
  type StoreRankItem,
} from '@/services/ant-design-pro/dashboard';
import SalesChart from '../SalesChart';
import StoreRank from '../StoreRank';
import { createStyles } from 'antd-style';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const useStyles = createStyles(({ token, css }) => {
  return {
    card: css`
      height: 100%;
      .ant-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
    filterBar: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${token.colorSplit};
    `,
    chartWrapper: css`
      flex: 1;
      min-height: 350px;
    `,
    rankWrapper: css`
      height: 100%;
    `,
  };
});

const SalesModule: React.FC = () => {
  const { styles } = useStyles();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>([
    dayjs().startOf('year'),
    dayjs(),
  ]);

  const params = useMemo(() => {
    if (!dateRange) return undefined;
    return {
      year: dateRange[0]?.year().toString(),
      month: ((dateRange[0]?.month() ?? 0) + 1).toString().padStart(2, '0'),
    };
  }, [dateRange]);

  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
    refresh: refreshChart,
  } = useRequest<API.ResBody<SalesChartItem[]>>(() => getSalesChart(params), {
    refreshDeps: [params],
  });

  const {
    data: rankData,
    loading: rankLoading,
    error: rankError,
    refresh: refreshRank,
  } = useRequest<API.ResBody<StoreRankItem[]>>(getStoreRank);

  const handleDateChange: RangePickerProps['onChange'] = useCallback(
    (dates) => {
      if (dates && dates[0] && dates[1]) {
        setDateRange([dates[0], dates[1]]);
      } else {
        setDateRange(null);
      }
    },
    []
  );

  const handleRefresh = useCallback(() => {
    refreshChart();
    refreshRank();
  }, [refreshChart, refreshRank]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={16}>
        <Card className={styles.card}>
          <div className={styles.filterBar}>
            <Space>
              <CalendarOutlined style={{ color: '#165DFF' }} />
              <span style={{ fontWeight: 500 }}>销售额统计</span>
            </Space>
            <Space>
              <RangePicker
                value={dateRange}
                onChange={handleDateChange}
                picker="date"
                format="YYYY-MM-DD"
                placeholder={['开始日期', '结束日期']}
                allowClear
              />
              <ReloadOutlined
                onClick={handleRefresh}
                style={{ cursor: 'pointer', color: '#165DFF' }}
                title="刷新数据"
              />
            </Space>
          </div>
          <div className={styles.chartWrapper}>
            <SalesChart
              data={chartData?.data}
              loading={chartLoading}
              error={!!chartError}
              onRetry={refreshChart}
            />
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card className={styles.card}>
          <div className={styles.rankWrapper}>
            <StoreRank
              data={rankData?.data}
              loading={rankLoading}
              error={!!rankError}
              onRetry={refreshRank}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SalesModule;
