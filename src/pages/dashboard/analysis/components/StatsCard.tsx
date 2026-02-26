import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Empty, Skeleton, Space, Typography } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';

const { Text, Paragraph } = Typography;

const useStyles = createStyles(({ token, css }) => {
  return {
    statsCard: css`
      height: 100%;
      .ant-card-body {
        padding: 20px 24px;
      }
    `,
    title: css`
      color: ${token.colorTextSecondary};
      font-size: 14px;
      margin-bottom: 4px;
    `,
    mainValue: css`
      font-size: 24px;
      font-weight: 600;
      color: ${token.colorTextHeading};
      line-height: 1.3;
      margin-bottom: 12px;
    `,
    subItem: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      font-size: 13px;
    `,
    subLabel: css`
      color: ${token.colorTextSecondary};
    `,
    subValue: css`
      font-weight: 500;
    `,
  };
});

interface DataItem {
  label: string;
  value: string | number;
  isGrowth?: boolean;
  growthValue?: number;
}

interface StatsCardProps {
  title: string;
  mainValue: string | number;
  data?: DataItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + 'w';
  }
  return num.toLocaleString('zh-CN');
};

const formatMoney = (num: number): string => {
  if (num >= 10000) {
    return '¥' + (num / 10000).toFixed(2) + 'w';
  }
  return '¥' + num.toLocaleString('zh-CN');
};

const GrowthTag: React.FC<{ value: number }> = ({ value }) => {
  const isPositive = value >= 0;
  const color = isPositive ? '#52c41a' : '#ff4d4f';
  return (
    <span style={{ color, fontSize: 12, display: 'flex', alignItems: 'center' }}>
      {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      {Math.abs(value)}%
    </span>
  );
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  mainValue,
  data = [],
  loading = false,
  error = false,
  onRetry,
}) => {
  const { styles } = useStyles();

  if (loading) {
    return (
      <Card className={styles.statsCard}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={styles.statsCard}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="数据加载失败"
          imageStyle={{ height: 40 }}
        >
          {onRetry && (
            <a onClick={onRetry} style={{ fontSize: 12 }}>
              重新加载
            </a>
          )}
        </Empty>
      </Card>
    );
  }

  return (
    <Card className={styles.statsCard} hoverable>
      <Paragraph className={styles.title}>{title}</Paragraph>
      <div className={styles.mainValue}>{mainValue}</div>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {data.map((item, index) => (
          <div key={index} className={styles.subItem}>
            <Text className={styles.subLabel}>{item.label}</Text>
            <Space>
              <Text className={styles.subValue}>{item.value}</Text>
              {item.growthValue !== undefined && (
                <GrowthTag value={item.growthValue} />
              )}
            </Space>
          </div>
        ))}
      </Space>
    </Card>
  );
};

export { formatNumber, formatMoney };
