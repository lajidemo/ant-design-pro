import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import DataOverview from './components/DataOverview';
import SalesModule from './components/SalesModule';

const AnalysisPage: React.FC = () => {
  return (
    <PageContainer>
      <DataOverview />
      <SalesModule />
    </PageContainer>
  );
};

export default AnalysisPage;
