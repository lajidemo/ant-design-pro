import { TrophyOutlined } from '@ant-design/icons';
import { Avatar, List, Progress } from 'antd';
import React from 'react';

interface StoreRankingProps {
  data: Array<{
    name: string;
    sales: number;
    rank: number;
  }>;
}

const StoreRanking: React.FC<StoreRankingProps> = ({ data }) => {
  const maxSales = Math.max(...data.map((item) => item.sales));

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700';
    if (rank === 2) return '#c0c0c0';
    if (rank === 3) return '#cd7f32';
    return '#8c8c8c';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return (
        <Avatar
          size="small"
          style={{
            backgroundColor: getRankColor(rank),
            marginRight: 8,
          }}
          icon={<TrophyOutlined />}
        />
      );
    }
    return (
      <Avatar
        size="small"
        style={{
          backgroundColor: '#f0f0f0',
          color: '#8c8c8c',
          marginRight: 8,
        }}
      >
        {rank}
      </Avatar>
    );
  };

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ padding: '8px 0' }}>
          <List.Item.Meta
            avatar={getRankIcon(item.rank)}
            title={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{item.name}</span>
                <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                  ¥{item.sales.toLocaleString()}
                </span>
              </div>
            }
            description={
              <Progress
                percent={Math.round((item.sales / maxSales) * 100)}
                showInfo={false}
                strokeColor="#1890ff"
                size="small"
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

export default StoreRanking;
