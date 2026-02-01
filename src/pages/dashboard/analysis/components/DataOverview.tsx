import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  Card,
  Col,
  Row,
  Statistic,
} from 'antd';
import { useTheme } from 'antd-style';
import React from 'react';
import type { DataOverviewProps } from '../types';
import { formatNumber, formatPercent } from '../utils';

const DataOverview: React.FC<DataOverviewProps> = ({ data, loading }) => {
  const theme = useTheme();

  const renderTrend = (value: number) => {
    if (value > 0) {
      return (
        <span style={{ color: '#52c41a' }}>
          {formatPercent(value)} <ArrowUpOutlined />
        </span>
      );
    } else if (value < 0) {
      return (
        <span style={{ color: '#ff4d4f' }}>
          {formatPercent(value)} <ArrowDownOutlined />
        </span>
      );
    }
    return <span style={{ color: '#8c8c8c' }}>{formatPercent(value)}</span>;
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card loading={loading}>
          <Statistic
            title="总销售额"
            value={data?.totalSales?.value || 0}
            precision={2}
            valueStyle={{ color: theme.colorPrimary }}
            prefix="¥"
            suffix={
              <div style={{ fontSize: 14, marginTop: 8 }}>
                <div>
                  周同比: {renderTrend(data?.totalSales?.weekOnWeek || 0)}
                </div>
                <div>
                  日同比: {renderTrend(data?.totalSales?.dayOnDay || 0)}
                </div>
                <div>
                  日销售额: ¥{formatNumber(data?.totalSales?.todaySales || 0)}
                </div>
              </div>
            }
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card loading={loading}>
          <Statistic
            title="访问量"
            value={data?.visits?.value || 0}
            valueStyle={{ color: '#3f8600' }}
            suffix={
              <div style={{ fontSize: 14, marginTop: 8 }}>
                <div>
                  日访问量: {formatNumber(data?.visits?.todayVisits || 0)}
                </div>
              </div>
            }
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card loading={loading}>
          <Statistic
            title="支付笔数"
            value={data?.paymentCount?.value || 0}
            valueStyle={{ color: '#cf1322' }}
            suffix={
              <div style={{ fontSize: 14, marginTop: 8 }}>
                <div>
                  转化率: {renderTrend(data?.paymentCount?.conversionRate || 0)}
                </div>
              </div>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DataOverview;
