import { PageContainer } from '@ant-design/pro-components';
import { createStyles } from 'antd-style';
import React from 'react';
import DataCards from './components/DataCards';
import SalesAnalysis from './components/SalesAnalysis';

const useStyles = createStyles(({ css }) => ({
  contentWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
}));

const Analysis: React.FC = () => {
  const { styles } = useStyles();

  return (
    <PageContainer>
      <div className={styles.contentWrapper}>
        <DataCards />
        <SalesAnalysis />
      </div>
    </PageContainer>
  );
};

export default Analysis;
