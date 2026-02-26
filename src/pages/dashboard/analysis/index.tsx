import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Empty, Result, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getDashboardAnalysis } from './api';
import DataCards from './components/DataCards';
import SalesChart from './components/SalesChart';
import StoreRanking from './components/StoreRanking';
import type { DashboardData } from './services';

const Analysis: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDashboardAnalysis();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError('数据加载失败，请稍后重试');
      }
    } catch {
      setError('数据加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Card>
          <Result
            status="error"
            title="加载失败"
            subTitle={error}
            extra={<a onClick={loadData}>重新加载</a>}
          />
        </Card>
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer>
        <Card>
          <Empty description="暂无数据" />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DataCards data={data.dataCards} />
        </Col>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col xs={24} lg={16}>
                <SalesChart data={data.salesData} />
              </Col>
              <Col xs={24} lg={8}>
                <StoreRanking data={data.storeRanking} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Analysis;
