import {
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import StatisticCard, { type DataStatus, Trend } from './StatisticCard';
import '../style.less';

export interface DataModuleData {
  totalSales?: {
    value: number;
    weekOverWeek?: string;
    dayOverDay?: string;
    dailySales?: number;
  };
  visits?: {
    value: number;
    dailyVisits?: number;
  };
  payments?: {
    value: number;
    conversionRate?: string;
  };
}

export interface DataModuleProps {
  data?: DataModuleData;
  status?: DataStatus;
  errorMessage?: string;
}

const DataModule: React.FC<DataModuleProps> = ({
  data,
  status = 'loading',
  errorMessage,
}) => {
  const formatCurrency = (value?: number) => {
    if (value === undefined) return '¥0';
    return `¥${value.toLocaleString()}`;
  };

  const formatNumber = (value?: number) => {
    if (value === undefined) return '0';
    return value.toLocaleString();
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12} lg={8}>
        <StatisticCard
          title="总销售额"
          value={data?.totalSales?.value}
          prefix={<DollarOutlined />}
          precision={2}
          status={status}
          errorMessage={errorMessage}
          footer={
            status === 'success' && (
              <>
                <Trend
                  trend="up"
                  value={data?.totalSales?.weekOverWeek}
                  label="周同比"
                />
                <Trend
                  trend="down"
                  value={data?.totalSales?.dayOverDay}
                  label="日同比"
                />
              </>
            )
          }
        />
        {status === 'success' && data?.totalSales?.dailySales !== undefined && (
          <div className="daily-sales-info">
            日销售额 {formatCurrency(data.totalSales.dailySales)}
          </div>
        )}
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <StatisticCard
          title="访问量"
          value={data?.visits?.value}
          prefix={<EyeOutlined />}
          status={status}
          errorMessage={errorMessage}
          footer={
            status === 'success' &&
            data?.visits?.dailyVisits !== undefined && (
              <div className="footer-info">
                日访问量 {formatNumber(data.visits.dailyVisits)}
              </div>
            )
          }
        />
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <StatisticCard
          title="支付笔数"
          value={data?.payments?.value}
          prefix={<CreditCardOutlined />}
          status={status}
          errorMessage={errorMessage}
          footer={
            status === 'success' &&
            data?.payments?.conversionRate && (
              <div className="footer-info">
                转化率 {data.payments.conversionRate}
              </div>
            )
          }
        />
      </Col>
    </Row>
  );
};

export default DataModule;
