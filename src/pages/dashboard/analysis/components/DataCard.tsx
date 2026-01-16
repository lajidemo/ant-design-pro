import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin, Statistic } from 'antd';
import React from 'react';

interface ExtraItem {
  label: string;
  value: number;
  suffix?: string;
}

interface DataCardProps {
  title: string;
  value: number;
  extra: ExtraItem[];
  loading?: boolean;
  prefix?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  extra,
  loading,
  prefix = '¥',
}) => {
  return (
    <Card>
      <Spin spinning={loading}>
        <Statistic
          title={title}
          value={value}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={prefix}
        />
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {extra.map((item) => (
            <Col span={24} key={item.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                  {item.label}:
                </span>
                {item.value >= 0 ? (
                  <span style={{ fontSize: 12, color: '#52c41a' }}>
                    <ArrowUpOutlined />
                    {Math.abs(item.value).toFixed(2)}
                    {item.suffix || ''}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: '#ff4d4f' }}>
                    <ArrowDownOutlined />
                    {Math.abs(item.value).toFixed(2)}
                    {item.suffix || ''}
                  </span>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Spin>
    </Card>
  );
};

export default DataCard;
