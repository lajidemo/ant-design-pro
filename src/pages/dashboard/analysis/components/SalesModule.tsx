import { Column } from '@ant-design/charts';
import {
  Card,
  Col,
  DatePicker,
  Empty,
  Radio,
  Result,
  Row,
  Skeleton,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import type { DataStatus } from './StatisticCard';
import '../style.less';

type DateRange = 'year' | 'month' | 'day';

export interface SalesChartData {
  date: string;
  value: number;
  type: string;
}

export interface StoreRankingItem {
  rank: number;
  storeName: string;
  sales: number;
}

export interface SalesModuleData {
  chartData?: SalesChartData[];
  storeRanking?: StoreRankingItem[];
}

export interface SalesModuleProps {
  data?: SalesModuleData;
  status?: DataStatus;
  errorMessage?: string;
  onDateRangeChange?: (range: DateRange) => void;
}

const SalesModule: React.FC<SalesModuleProps> = ({
  data,
  status = 'loading',
  errorMessage = '加载失败',
  onDateRangeChange,
}) => {
  const [dateRange, setDateRange] = useState<DateRange>('month');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const handleDateRangeChange = (e: any) => {
    const value = e.target.value as DateRange;
    setDateRange(value);
    onDateRangeChange?.(value);
  };

  const chartConfig = useMemo(() => {
    return {
      data: data?.chartData || [],
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
      label: {
        position: 'top',
        style: {
          fill: '#000000',
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
          formatter: (v: string) => `¥${v}`,
        },
      },
      legend: {
        position: 'top-right',
      },
      tooltip: {
        formatter: (datum: any) => {
          return { name: datum.type, value: `¥${datum.value}` };
        },
      },
    };
  }, [data?.chartData]);

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <span
          className={`ranking-number ${rank <= 3 ? 'top-three' : 'others'}`}
        >
          {rank}
        </span>
      ),
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
      ellipsis: true,
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      key: 'sales',
      align: 'right' as const,
      render: (sales: number) => `¥${sales.toLocaleString()}`,
    },
  ];

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Col>
            <Col xs={24} lg={8}>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Col>
          </Row>
        );
      case 'error':
        return (
          <Result
            status="error"
            title={errorMessage}
            style={{ padding: '40px 0' }}
          />
        );
      case 'empty':
        return (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无数据"
            style={{ padding: '40px 0' }}
          />
        );
      default:
        return (
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <Column {...chartConfig} height={300} />
            </Col>
            <Col xs={24} lg={8}>
              <div className="store-ranking">
                <h4>门店销售排名</h4>
                <Table
                  dataSource={data?.storeRanking || []}
                  columns={columns}
                  pagination={false}
                  size="small"
                  rowKey="rank"
                  showHeader={false}
                />
              </div>
            </Col>
          </Row>
        );
    }
  };

  return (
    <Card
      title="销售额"
      className="sales-card"
      bordered={false}
      extra={
        <div className="sales-extra">
          <Radio.Group
            value={dateRange}
            onChange={handleDateRangeChange}
            optionType="button"
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value="year">年</Radio.Button>
            <Radio.Button value="month">月</Radio.Button>
            <Radio.Button value="day">日</Radio.Button>
          </Radio.Group>
          <DatePicker
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            picker={dateRange}
            size="small"
            allowClear={false}
          />
        </div>
      }
    >
      {renderContent()}
    </Card>
  );
};

export default SalesModule;
