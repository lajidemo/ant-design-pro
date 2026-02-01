import {
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import StatCard from '../StatCard';

interface DataCardsData {
  totalSales: {
    value: number;
    weekOnWeek: number;
    dayOnDay: number;
    dailySales: number;
  };
  visits: {
    value: number;
    dailyVisits: number;
  };
  payments: {
    value: number;
    conversionRate: number;
  };
}

interface DataCardsProps {
  loading?: boolean;
  error?: boolean;
  data?: DataCardsData;
}

const mockData: DataCardsData = {
  totalSales: {
    value: 12567890.56,
    weekOnWeek: 12.5,
    dayOnDay: 5.2,
    dailySales: 156789.32,
  },
  visits: {
    value: 895678,
    dailyVisits: 12567,
  },
  payments: {
    value: 56789,
    conversionRate: 6.34,
  },
};

const DataCards: React.FC<DataCardsProps> = ({
  loading: propsLoading,
  error: propsError,
  data: propsData,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DataCardsData | null>(null);

  useEffect(() => {
    if (propsData !== undefined) {
      setData(propsData);
      setLoading(propsLoading || false);
      setError(propsError || false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setData(mockData);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [propsData, propsLoading, propsError]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatInteger = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="总销售额"
          value={`¥${formatNumber(data?.totalSales.value || 0)}`}
          icon={<DollarOutlined />}
          trend={
            data?.totalSales.weekOnWeek && data?.totalSales.weekOnWeek >= 0
              ? 'up'
              : 'down'
          }
          trendValue={data?.totalSales.weekOnWeek || 0}
          extra={
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                周同比
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.45)',
                  marginTop: 4,
                }}
              >
                日同比:{' '}
                {data?.totalSales.dayOnDay && data?.totalSales.dayOnDay >= 0
                  ? '+'
                  : ''}
                {data?.totalSales.dayOnDay || 0}%
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.45)',
                  marginTop: 4,
                }}
              >
                日销售额: ¥{formatNumber(data?.totalSales.dailySales || 0)}
              </div>
            </div>
          }
          loading={loading}
          error={error}
          empty={!data}
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="访问量"
          value={formatInteger(data?.visits.value || 0)}
          icon={<EyeOutlined />}
          extra={
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                日访问量: {formatInteger(data?.visits.dailyVisits || 0)}
              </div>
            </div>
          }
          loading={loading}
          error={error}
          empty={!data}
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="支付笔数"
          value={formatInteger(data?.payments.value || 0)}
          icon={<CreditCardOutlined />}
          extra={
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                转化率: {data?.payments.conversionRate || 0}%
              </div>
            </div>
          }
          loading={loading}
          error={error}
          empty={!data}
        />
      </Col>
    </Row>
  );
};

export default DataCards;
