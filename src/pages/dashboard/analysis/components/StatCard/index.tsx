import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Skeleton, Statistic } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    position: relative;
    overflow: hidden;
  `,
  trendUp: css`
    color: ${token.colorSuccess};
  `,
  trendDown: css`
    color: ${token.colorError};
  `,
  iconWrapper: css`
    position: absolute;
    right: 16px;
    top: 16px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: ${token.colorPrimaryBg};
    font-size: 24px;
    color: ${token.colorPrimary};
  `,
}));

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number | string;
  extra?: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  extra,
  loading = false,
  error = false,
  empty = false,
}) => {
  const { styles } = useStyles();

  const renderContent = () => {
    if (loading) {
      return <Skeleton active paragraph={{ rows: 1 }} />;
    }

    if (error || empty) {
      return (
        <Statistic
          title={title}
          value={error ? '--' : '暂无数据'}
          suffix={
            trendValue ? (
              <span
                className={trend === 'up' ? styles.trendUp : styles.trendDown}
              >
                --
              </span>
            ) : undefined
          }
        />
      );
    }

    return (
      <Statistic
        title={title}
        value={value}
        prefix={
          trend ? (
            <span
              className={trend === 'up' ? styles.trendUp : styles.trendDown}
            >
              {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </span>
          ) : undefined
        }
        suffix={
          trendValue !== undefined ? (
            <span
              className={trend === 'up' ? styles.trendUp : styles.trendDown}
            >
              {typeof trendValue === 'number' ? `${trendValue}%` : trendValue}
            </span>
          ) : undefined
        }
        extra={extra}
      />
    );
  };

  return (
    <Card className={styles.card}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      {renderContent()}
    </Card>
  );
};

export default StatCard;
