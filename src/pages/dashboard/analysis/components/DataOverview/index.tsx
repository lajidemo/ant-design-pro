import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';
import {
  getOverview,
  type OverviewData,
} from '@/services/ant-design-pro/dashboard';
import { StatsCard, formatMoney, formatNumber } from '../StatsCard';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    container: {
      marginBottom: 24,
    },
  };
});

const DataOverview: React.FC = () => {
  const { styles } = useStyles();

  const { data, loading, error, refresh } = useRequest<
    API.ResBody<OverviewData>
  >(getOverview, {
    onError: () => {
      console.error('Failed to fetch overview data');
    },
  });

  const overviewData = data?.data;

  const totalSalesData = [
    {
      label: '周同比',
      value: overviewData?.totalSales.weeklyGrowth || 0,
      growthValue: overviewData?.totalSales.weeklyGrowth || 0,
    },
    {
      label: '日同比',
      value: overviewData?.totalSales.dailyGrowth || 0,
      growthValue: overviewData?.totalSales.dailyGrowth || 0,
    },
    {
      label: '日销售额',
      value: formatMoney(overviewData?.totalSales.todaySales || 0),
    },
  ];

  const visitsData = [
    {
      label: '日访问量',
      value: formatNumber(overviewData?.visits.todayVisits || 0),
    },
  ];

  const paymentsData = [
    {
      label: '转化率',
      value: `${overviewData?.payments.conversionRate || 0}%`,
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard
            title="总销售额"
            mainValue={formatMoney(overviewData?.totalSales.totalSales || 0)}
            data={totalSalesData}
            loading={loading}
            error={!!error}
            onRetry={refresh}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard
            title="访问量"
            mainValue={formatNumber(overviewData?.visits.totalVisits || 0)}
            data={visitsData}
            loading={loading}
            error={!!error}
            onRetry={refresh}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatsCard
            title="支付笔数"
            mainValue={formatNumber(overviewData?.payments.totalPayments || 0)}
            data={paymentsData}
            loading={loading}
            error={!!error}
            onRetry={refresh}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DataOverview;
