import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import type { DataCardsData } from '../services';
import styles from './DataCards.less';

interface DataCardsProps {
  data: DataCardsData;
}

const DataCard: React.FC<{
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    type: 'up' | 'down';
  };
  subData?: {
    label: string;
    value: number | string;
  }[];
}> = ({ title, value, prefix, suffix, trend, subData }) => {
  return (
    <Card className={styles.dataCard}>
      <div className={styles.cardTitle}>{title}</div>
      <Statistic
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ fontSize: '24px', fontWeight: 600 }}
      />
      {trend && (
        <div className={styles.trendContainer}>
          <span className={styles.trendLabel}>周同比</span>
          <span
            className={trend.type === 'up' ? styles.trendUp : styles.trendDown}
          >
            {trend.type === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
            {trend.value}%
          </span>
        </div>
      )}
      {subData && subData.length > 0 && (
        <div className={styles.subDataContainer}>
          {subData.map((item) => (
            <div key={item.label}>
              <span className={styles.subDataLabel}>{item.label}</span>
              <span className={styles.subDataValue}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const DataCards: React.FC<DataCardsProps> = ({ data }) => {
  const weekTrendValue = data.totalSales.weekTrend;
  const weekTrend = {
    value: Math.abs(weekTrendValue),
    type: weekTrendValue >= 0 ? ('up' as const) : ('down' as const),
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={8}>
        <DataCard
          title="总销售额"
          value={data.totalSales.value}
          prefix="¥"
          trend={weekTrend}
          subData={[
            {
              label: '日同比',
              value: `${data.totalSales.dayTrend > 0 ? '+' : ''}${data.totalSales.dayTrend}%`,
            },
            {
              label: '日销售额',
              value: `¥${data.totalSales.dailySales.toLocaleString()}`,
            },
          ]}
        />
      </Col>
      <Col xs={24} sm={8}>
        <DataCard
          title="访问量"
          value={data.visitCount.value}
          suffix="次"
          subData={[
            {
              label: '日访问量',
              value: `${data.visitCount.dailyValue.toLocaleString()}次`,
            },
          ]}
        />
      </Col>
      <Col xs={24} sm={8}>
        <DataCard
          title="支付笔数"
          value={data.paymentCount.value}
          suffix="笔"
          subData={[
            { label: '转化率', value: `${data.paymentCount.conversionRate}%` },
          ]}
        />
      </Col>
    </Row>
  );
};

export default DataCards;
