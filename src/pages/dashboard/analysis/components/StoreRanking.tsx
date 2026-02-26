import { Card, Empty, List, Progress, theme } from 'antd';
import React from 'react';
import type { StoreRankingItem } from '../services';

interface StoreRankingProps {
  data: StoreRankingItem[];
}

const StoreRanking: React.FC<StoreRankingProps> = ({ data }) => {
  const { token } = theme.useToken();

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ff4d4f';
    if (rank === 2) return '#faad14';
    if (rank === 3) return '#52c41a';
    return token.colorTextSecondary;
  };

  const maxSales = Math.max(...data.map((item) => item.sales));

  if (!data || data.length === 0) {
    return (
      <Card title="门店销售排名">
        <Empty description="暂无数据" />
      </Card>
    );
  }

  return (
    <Card
      title="门店销售排名"
      styles={{ body: { maxHeight: 350, overflow: 'auto' } }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ padding: '8px 0' }}>
            <div style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: getRankColor(item.rank),
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.rank}
                  </span>
                  <span>{item.name}</span>
                </div>
                <span style={{ fontWeight: 500 }}>
                  ¥{item.sales.toLocaleString()}
                </span>
              </div>
              <Progress
                percent={(item.sales / maxSales) * 100}
                showInfo={false}
                strokeColor="#1890ff"
                trailColor="#f0f0f0"
                size="small"
              />
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default StoreRanking;
