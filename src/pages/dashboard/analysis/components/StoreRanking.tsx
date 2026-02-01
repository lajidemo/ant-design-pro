import { ShopOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Progress } from 'antd';
import React from 'react';
import type { StoreRankingProps } from '../types';
import { formatNumber, getProgressColor } from '../utils';

const StoreRanking: React.FC<StoreRankingProps> = ({ data, loading }) => {
  return (
    <Card title="门店销售排名" loading={loading}>
      <List
        dataSource={data || []}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor:
                      index === 0
                        ? '#f56a00'
                        : index === 1
                          ? '#7265e6'
                          : index === 2
                            ? '#00a2ae'
                            : '#87d068',
                    verticalAlign: 'middle',
                  }}
                  size="small"
                >
                  {index + 1}
                </Avatar>
              }
              title={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <ShopOutlined style={{ marginRight: 8 }} />
                    {item.name}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>
                    ¥{formatNumber(item.sales)}
                  </span>
                </div>
              }
              description={
                <Progress
                  percent={item.percentage}
                  strokeColor={getProgressColor(item.percentage)}
                  showInfo={false}
                  size="small"
                />
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default StoreRanking;
