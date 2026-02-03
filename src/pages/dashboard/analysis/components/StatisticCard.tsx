import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Card, Empty, Result, Skeleton, Statistic } from 'antd';
import React from 'react';
import '../style.less';

export type DataStatus = 'loading' | 'success' | 'empty' | 'error';

export interface StatisticCardProps {
  title: string;
  value?: number | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
  footer?: React.ReactNode;
  status?: DataStatus;
  errorMessage?: string;
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision,
  valueStyle,
  footer,
  status = 'success',
  errorMessage = '加载失败',
  className,
}) => {
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Skeleton active paragraph={{ rows: 2 }} />;
      case 'error':
        return (
          <Result status="error" title={errorMessage} style={{ padding: 0 }} />
        );
      case 'empty':
        return (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
        );
      default:
        return (
          <Statistic
            title={title}
            value={value}
            prefix={prefix}
            suffix={suffix}
            precision={precision}
            valueStyle={valueStyle}
          />
        );
    }
  };

  return (
    <Card className={`statistic-card ${className || ''}`} bordered={false}>
      {renderContent()}
      {status === 'success' && footer && (
        <div className="statistic-card-footer">{footer}</div>
      )}
    </Card>
  );
};

export interface TrendProps {
  trend?: 'up' | 'down';
  value?: string | number;
  label?: string;
}

export const Trend: React.FC<TrendProps> = ({ trend, value, label }) => {
  if (!trend || value === undefined) return null;

  const icon = trend === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  const trendClass = trend === 'up' ? 'trend-up' : 'trend-down';

  return (
    <span className={`trend ${trendClass}`}>
      <span className="trend-icon">{icon}</span>
      <span>{value}</span>
      {label && <span className="trend-label">{label}</span>}
    </span>
  );
};

export default StatisticCard;
