import { Column } from '@antv/g2plot';
import { Card } from 'antd';
import React, { useEffect, useRef } from 'react';
import type { SalesChartProps } from '../types';

const SalesChart: React.FC<SalesChartProps> = ({ data, loading }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Column | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data || loading) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Column(chartRef.current, {
      data,
      xField: 'date',
      yField: 'sales',
      height: 300,
      columnWidthRatio: 0.6,
      meta: {
        sales: {
          alias: '销售额',
          formatter: (v) => `¥${(v / 10000).toFixed(2)}万`,
        },
        date: {
          alias: '日期',
        },
      },
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
        },
      },
      tooltip: {
        formatter: (datum) => ({
          name: '销售额',
          value: `¥${datum.sales.toLocaleString()}`,
        }),
      },
      interactions: [
        {
          type: 'active-region',
          enable: false,
        },
      ],
    });

    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, loading]);

  return (
    <Card title="销售额趋势" loading={loading}>
      <div ref={chartRef} style={{ height: 300 }} />
    </Card>
  );
};

export default SalesChart;
