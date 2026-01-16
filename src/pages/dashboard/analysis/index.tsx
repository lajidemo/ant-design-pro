import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Bar } from '@antv/g2plot';
import {
  Button,
  Card,
  Col,
  DatePicker,
  message,
  Row,
  Select,
  Skeleton,
  Statistic,
  Table,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DataModuleProps {
  loading?: boolean;
  data?: {
    totalSales: number;
    weekGrowth: number;
    dayGrowth: number;
    daySales: number;
    visitors: number;
    dayVisitors: number;
    orders: number;
    conversionRate: number;
  };
  error?: boolean;
}

const DataModule: React.FC<DataModuleProps> = ({
  loading = false,
  data,
  error = false,
}) => {
  if (error) {
    return (
      <Card bordered={false}>
        <div className="error-state">数据加载失败，请稍后重试</div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card bordered={false}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Col>
          <Col span={8}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Col>
          <Col span={8}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Col>
        </Row>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card bordered={false}>
        <div className="empty-state">暂无数据</div>
      </Card>
    );
  }

  const {
    totalSales,
    weekGrowth,
    dayGrowth,
    daySales,
    visitors,
    dayVisitors,
    orders,
    conversionRate,
  } = data;

  return (
    <Card bordered={false} className="data-module">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="总销售额"
              value={totalSales}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
            />
            <div className="stat-info">
              <span className={`growth ${weekGrowth > 0 ? 'up' : 'down'}`}>
                {weekGrowth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                周同比 {Math.abs(weekGrowth)}%
              </span>
              <span className={`growth ${dayGrowth > 0 ? 'up' : 'down'}`}>
                {dayGrowth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                日同比 {Math.abs(dayGrowth)}%
              </span>
            </div>
            <div className="day-stat">
              <span>日销售额: ¥{daySales.toFixed(2)}</span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="访问量"
              value={visitors}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="day-stat">
              <span>日访问量: {dayVisitors}</span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="支付笔数"
              value={orders}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="day-stat">
              <span>转化率: {conversionRate}%</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

interface SalesModuleProps {
  loading?: boolean;
  data?: {
    chartData: Array<{ date: string; sales: number }>;
    rankingData: Array<{
      rank: number;
      store: string;
      sales: number;
      growth: number;
    }>;
  };
  error?: boolean;
}

const SalesModule: React.FC<SalesModuleProps> = ({
  loading = false,
  data,
  error = false,
}) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<Bar | null>(null);

  const { chartData, rankingData } = data;

  useEffect(() => {
    if (chartRef.current && !plotRef.current) {
      plotRef.current = new Bar(chartRef.current, {
        data: chartData,
        xField: 'date',
        yField: 'sales',
        color: ['#1890ff'],
        label: {
          position: 'middle',
          style: {
            fill: '#ffffff',
            opacity: 0.8,
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
            formatter: (v: string) => `¥${v}`,
          },
        },
        tooltip: {
          formatter: (datum: { date: string; sales: number }) => {
            return {
              name: datum.date,
              value: `¥${datum.sales}`,
            };
          },
        },
      });
      plotRef.current.render();
    }

    return () => {
      if (plotRef.current) {
        plotRef.current.destroy();
        plotRef.current = null;
      }
    };
  }, [chartData]);

  if (error) {
    return (
      <Card bordered={false}>
        <div className="error-state">数据加载失败，请稍后重试</div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card bordered={false}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card bordered={false}>
        <div className="empty-state">暂无数据</div>
      </Card>
    );
  }
  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (text: number) => (
        <span className={`rank-badge rank-${text}`}>{text}</span>
      ),
    },
    {
      title: '门店',
      dataIndex: 'store',
      key: 'store',
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      key: 'sales',
      width: 150,
      render: (text: number) => `¥${text.toFixed(2)}`,
    },
    {
      title: '增长率',
      dataIndex: 'growth',
      key: 'growth',
      width: 120,
      render: (text: number) => (
        <span className={text > 0 ? 'growth up' : 'growth down'}>
          {text > 0 ? '+' : ''}
          {text}%
        </span>
      ),
    },
  ];

  return (
    <Card bordered={false} className="sales-module">
      <div className="filter-section">
        <Select defaultValue="year" style={{ width: 120, marginRight: 16 }}>
          <Option value="year">年度</Option>
          <Option value="quarter">季度</Option>
          <Option value="month">月度</Option>
          <Option value="week">周度</Option>
        </Select>
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [Date, Date] | null)}
          style={{ marginRight: 16 }}
          placeholder={['开始日期', '结束日期']}
        />
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={16}>
          <Card title="销售趋势" bordered={false}>
            <div ref={chartRef} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="门店销售排名" bordered={false}>
            <Table
              dataSource={rankingData}
              columns={columns}
              rowKey="rank"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const AnalysisPage: React.FC = () => {
  const [dataModuleLoading, setDataModuleLoading] = useState(false);
  const [salesModuleLoading, setSalesModuleLoading] = useState(false);
  const [dataModuleError, setDataModuleError] = useState(false);
  const [salesModuleError, setSalesModuleError] = useState(false);

  const [dataModuleData] = useState<DataModuleProps['data']>({
    totalSales: 1258000.5,
    weekGrowth: 12.5,
    dayGrowth: -2.3,
    daySales: 45680.2,
    visitors: 15800,
    dayVisitors: 820,
    orders: 3280,
    conversionRate: 20.8,
  });

  const [salesModuleData] = useState<SalesModuleProps['data']>({
    chartData: [
      { date: '01-01', sales: 45000 },
      { date: '01-02', sales: 52000 },
      { date: '01-03', sales: 48000 },
      { date: '01-04', sales: 61000 },
      { date: '01-05', sales: 58000 },
      { date: '01-06', sales: 67000 },
      { date: '01-07', sales: 72000 },
    ],
    rankingData: [
      { rank: 1, store: '北京旗舰店', sales: 285000, growth: 15.2 },
      { rank: 2, store: '上海中心店', sales: 268000, growth: 12.8 },
      { rank: 3, store: '深圳万象城店', sales: 245000, growth: 8.5 },
      { rank: 4, store: '广州天河店', sales: 212000, growth: 5.2 },
      { rank: 5, store: '成都春熙路店', sales: 188000, growth: -1.2 },
    ],
  });

  const refreshData = async () => {
    setDataModuleLoading(true);
    setSalesModuleLoading(true);
    setDataModuleError(false);
    setSalesModuleError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success('数据刷新成功');
    } catch (error) {
      console.log(error);
      setDataModuleError(true);
      setSalesModuleError(true);
      message.error('数据刷新失败');
    } finally {
      setDataModuleLoading(false);
      setSalesModuleLoading(false);
    }
  };

  return (
    <div className="analysis-page">
      <div className="page-header">
        <h1>分析页</h1>
        <div className="header-actions">
          <Button className="refresh-btn" onClick={refreshData}>
            {dataModuleLoading || salesModuleLoading ? (
              <>
                <LoadingOutlined spin /> 刷新中...
              </>
            ) : (
              '刷新数据'
            )}
          </Button>
        </div>
      </div>
      <DataModule
        loading={dataModuleLoading}
        data={dataModuleData}
        error={dataModuleError}
      />
      <SalesModule
        loading={salesModuleLoading}
        data={salesModuleData}
        error={salesModuleError}
      />
    </div>
  );
};

export default AnalysisPage;
