import { Bar } from '@ant-design/plots';
import {
  Alert,
  Card,
  Col,
  DatePicker,
  Empty,
  Row,
  Spin,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { createStyles } from 'antd-style';
import dayjs, { type Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles(({ css }) => ({
  filterWrapper: css`
    margin-bottom: 16px;
  `,
  chartWrapper: css`
    height: 350px;
    position: relative;
  `,
  chartLoading: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
}));

interface SalesData {
  date: string;
  sales: number;
}

interface StoreRankData {
  key: string;
  rank: number;
  storeName: string;
  sales: number;
  growth: number;
}

interface SalesAnalysisProps {
  loading?: boolean;
  error?: boolean;
}

const mockSalesData: SalesData[] = [
  { date: '2026-01-01', sales: 12000 },
  { date: '2026-01-02', sales: 15000 },
  { date: '2026-01-03', sales: 18000 },
  { date: '2026-01-04', sales: 14000 },
  { date: '2026-01-05', sales: 22000 },
  { date: '2026-01-06', sales: 25000 },
  { date: '2026-01-07', sales: 28000 },
  { date: '2026-01-08', sales: 21000 },
  { date: '2026-01-09', sales: 19000 },
  { date: '2026-01-10', sales: 26000 },
  { date: '2026-01-11', sales: 30000 },
  { date: '2026-01-12', sales: 32000 },
];

const mockStoreRankData: StoreRankData[] = [
  {
    key: '1',
    rank: 1,
    storeName: '北京朝阳门店',
    sales: 1256789,
    growth: 15.2,
  },
  {
    key: '2',
    rank: 2,
    storeName: '上海浦东门店',
    sales: 1123456,
    growth: 12.8,
  },
  { key: '3', rank: 3, storeName: '广州天河门店', sales: 987654, growth: 8.5 },
  { key: '4', rank: 4, storeName: '深圳南山门店', sales: 876543, growth: 6.2 },
  { key: '5', rank: 5, storeName: '杭州西湖门店', sales: 765432, growth: 10.1 },
];

const SalesAnalysis: React.FC<SalesAnalysisProps> = ({
  loading: propsLoading,
  error: propsError,
}) => {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [storeRankData, setStoreRankData] = useState<StoreRankData[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  useEffect(() => {
    if (propsLoading !== undefined) {
      setLoading(propsLoading);
      setError(propsError || false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setSalesData(mockSalesData);
        setStoreRankData(mockStoreRankData);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [propsLoading, propsError]);

  const columns: ColumnsType<StoreRankData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center',
      render: (rank: number) => {
        let color = 'default';
        if (rank === 1) color = 'gold';
        else if (rank === 2) color = 'silver';
        else if (rank === 3) color = 'bronze';
        return <Tag color={color}>{rank}</Tag>;
      },
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => `¥${sales.toLocaleString('zh-CN')}`,
    },
    {
      title: '增长率',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth: number) => (
        <span style={{ color: growth >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {growth >= 0 ? '+' : ''}
          {growth}%
        </span>
      ),
    },
  ];

  const barConfig = {
    data: salesData,
    xField: 'date',
    yField: 'sales',
    colorField: 'date',
    color: ['#165DFF'],
    label: {
      position: 'middle' as const,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (value: string) => `¥${Number(value).toLocaleString()}`,
      },
    },
    tooltip: {
      formatter: (datum: SalesData) => {
        return {
          name: datum.date,
          value: `¥${datum.sales.toLocaleString()}`,
        };
      },
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 500,
      },
    },
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className={styles.chartWrapper}>
          <div className={styles.chartLoading}>
            <Spin size="large" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.chartWrapper}>
          <Alert
            message="数据加载失败"
            description="图表数据加载出错，请稍后重试。"
            type="error"
            showIcon
          />
        </div>
      );
    }

    if (!salesData || salesData.length === 0) {
      return (
        <div className={styles.chartWrapper}>
          <Empty description="暂无数据" />
        </div>
      );
    }

    return (
      <div className={styles.chartWrapper}>
        <Bar {...barConfig} />
      </div>
    );
  };

  const renderTable = () => {
    if (loading) {
      return <Spin tip="加载中..." />;
    }

    if (error) {
      return (
        <Alert
          message="数据加载失败"
          description="排名数据加载出错，请稍后重试。"
          type="error"
          showIcon
        />
      );
    }

    if (!storeRankData || storeRankData.length === 0) {
      return <Empty description="暂无排名数据" />;
    }

    return (
      <Table
        columns={columns}
        dataSource={storeRankData}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <Card title="销售额分析">
      <div className={styles.filterWrapper}>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
          placeholder={['开始日期', '结束日期']}
          style={{ width: 260 }}
        />
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="销售额趋势" size="small" type="inner">
            {renderChart()}
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="门店销售排名" size="small" type="inner">
            {renderTable()}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default SalesAnalysis;
