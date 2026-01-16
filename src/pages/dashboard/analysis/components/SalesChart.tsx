import { Column } from '@ant-design/charts';
import React from 'react';

interface SalesChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const getDateFormat = (dateStr: string) => {
    if (dateStr.length === 4) return 'year';
    if (dateStr.length === 7) return 'month';
    return 'day';
  };

  const dateFormat = data.length > 0 ? getDateFormat(data[0].date) : 'day';

  const xAxisTitle = {
    day: '日期',
    month: '月份',
    year: '年份',
  }[dateFormat];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    label: {
      position: 'top',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      title: {
        text: '销售额',
      },
      label: {
        formatter: (v: string) => `¥${v}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: '销售额',
          value: `¥${datum.value}`,
        };
      },
    },
    color: '#1890ff',
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return <Column {...config} style={{ height: 400 }} />;
};

export default SalesChart;
