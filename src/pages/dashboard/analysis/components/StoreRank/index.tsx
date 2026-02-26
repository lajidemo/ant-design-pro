import { TrophyOutlined } from '@ant-design/icons';
import { Empty, List, Skeleton, Space, Typography } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';
import type { StoreRankItem } from '@/services/ant-design-pro/dashboard';

const { Text } = Typography;

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      height: 100%;
      .ant-list-header {
        border-bottom: 1px solid ${token.colorSplit};
        padding: 12px 16px;
        font-weight: 500;
      }
    `,
    rankItem: css`
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    `,
    rankBadge: css`
      width: 20px;
      height: 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      margin-right: 12px;
      flex-shrink: 0;
    `,
    storeInfo: css`
      flex: 1;
      min-width: 0;
      .store-name {
        font-size: 14px;
        color: ${token.colorText};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
    salesInfo: css`
      text-align: right;
      flex-shrink: 0;
      margin-left: 12px;
      .sales-value {
        font-size: 14px;
        font-weight: 500;
        color: ${token.colorTextHeading};
      }
      .orders-count {
        font-size: 12px;
        color: ${token.colorTextSecondary};
      }
    `,
  };
});

interface StoreRankProps {
  data?: StoreRankItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return '#FFD700';
    case 2:
      return '#C0C0C0';
    case 3:
      return '#CD7F32';
    default:
      return '#8c8c8c';
  }
};

const formatSales = (value: number): string => {
  if (value >= 10000) {
    return '¥' + (value / 10000).toFixed(2) + 'w';
  }
  return '¥' + value.toLocaleString('zh-CN');
};

const StoreRank: React.FC<StoreRankProps> = ({
  data = [],
  loading = false,
  error = false,
  onRetry,
}) => {
  const { styles } = useStyles();

  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
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
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <List
        header={
          <Space>
            <TrophyOutlined style={{ color: '#FAAD14' }} />
            <span>门店销售排名</span>
          </Space>
        }
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.rankItem}>
              <div
                className={styles.rankBadge}
                style={{
                  backgroundColor: getRankColor(item.rank),
                  color: item.rank <= 3 ? '#fff' : '#fff',
                }}
              >
                {item.rank}
              </div>
              <div className={styles.storeInfo}>
                <div className="store-name">{item.storeName}</div>
              </div>
              <div className={styles.salesInfo}>
                <div className="sales-value">
                  {formatSales(item.sales)}
                </div>
                <div className="orders-count">{item.orders} 单</div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StoreRank;
