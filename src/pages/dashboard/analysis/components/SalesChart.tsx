import { Chart } from '@antv/g2';
import { Card, Empty, Radio, Space, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getDashboardSales } from '../api';
import type { SalesDataItem } from '../services';

interface SalesChartProps {
  data: SalesDataItem[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data: initialData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [range, setRange] = useState<'year' | 'month' | 'day'>('month');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<SalesDataItem[]>(initialData);

  useEffect(() => {
    setChartData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!chartRef.current || !chartData.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chart = new Chart({
      container: chartRef.current,
      autoFit: true,
      height: 300,
    });

    chartInstance.current = chart;

    chart.options({
      type: 'interval',
      data: chartData,
      encode: {
        x: 'date',
        y: 'sales',
      },
      axis: {
        x: {
          title: '日期',
          labelAutoRotate: true,
        },
        y: {
          title: '销售额 (¥)',
          labelFormatter: (val: number) => `¥${(val / 1000).toFixed(0)}k`,
        },
      },
      style: {
        fill: '#1890ff',
        radius: 4,
      },
      tooltip: {
        title: (d: SalesDataItem) => d.date,
        items: [
          {
            channel: 'y',
            valueFormatter: (v: number) => `¥${v.toLocaleString()}`,
          },
        ],
      },
    });

    chart.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  const handleRangeChange = async (value: 'year' | 'month' | 'day') => {
    setRange(value);
    setLoading(true);
    try {
      const response = await getDashboardSales({ range: value });
      if (response.success && response.data) {
        setChartData(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="销售额趋势"
      extra={
        <Space>
          <Radio.Group
            value={range}
            onChange={(e) => handleRangeChange(e.target.value)}
          >
            <Radio.Button value="year">年</Radio.Button>
            <Radio.Button value="month">月</Radio.Button>
            <Radio.Button value="day">日</Radio.Button>
          </Radio.Group>
        </Space>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
        </div>
      ) : chartData.length === 0 ? (
        <Empty description="暂无数据" />
      ) : (
        <div ref={chartRef} style={{ minHeight: 300 }} />
      )}
    </Card>
  );
};

export default SalesChart;
