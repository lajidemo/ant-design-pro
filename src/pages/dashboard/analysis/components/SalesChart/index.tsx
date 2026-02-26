import { Empty, Spin } from 'antd';
import React from 'react';
import { Bar } from '@ant-design/charts';
import { createStyles } from 'antd-style';
import type { SalesChartItem } from '@/services/ant-design-pro/dashboard';

const useStyles = createStyles(() => {
  return {
    chartContainer: {
      width: '100%',
      height: '100%',
      minHeight: 350,
      position: 'relative' as const,
    },
    loadingOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1,
    },
  };
});

interface SalesChartProps {
  data?: SalesChartItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const SalesChart: React.FC<SalesChartProps> = ({
  data = [],
  loading = false,
  error = false,
  onRetry,
}) => {
  const { styles } = useStyles();

  if (error) {
    return (
      <div className={styles.chartContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="图表数据加载失败"
          imageStyle={{ height: 60 }}
        >
          {onRetry && (
            <a onClick={onRetry} style={{ fontSize: 12 }}>
              重新加载
            </a>
          )}
        </Empty>
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无数据"
          imageStyle={{ height: 60 }}
        />
      </div>
    );
  }

  const chartData = data.map((item) => ({
    type: '销售额',
    date: item.date,
    value: item.sales,
  }));

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ['#165DFF'],
    label: {
      style: {
        fill: '#aaa',
      },
      formatter: (datum: { value: number }) => {
        if (datum.value >= 10000) {
          return (datum.value / 10000).toFixed(0) + 'w';
        }
        return datum.value.toString();
      },
    },
    tooltip: {
      formatter: (datum: { value: number; date: string }) => {
        return {
          name: datum.date,
          value: '¥' + datum.value.toLocaleString('zh-CN'),
        };
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
        formatter: (value: number) => {
          if (value >= 10000) {
            return (value / 10000).toFixed(0) + 'w';
          }
          return value.toString();
        },
      },
    },
    animation: {
      appear: {
        animation: 'scale-in-y',
        duration: 500,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <Spin size="large" />
        </div>
      )}
      <Bar {...config} />
    </div>
  );
};

export default SalesChart;
