import { PageContainer } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useState } from 'react';
import DataModule, { type DataModuleData } from './components/DataModule';
import SalesModule, { type SalesModuleData } from './components/SalesModule';
import type { DataStatus } from './components/StatisticCard';
import './style.less';

// 模拟数据服务
const mockDataService = {
  // 获取数据模块数据
  getDataModule: async (): Promise<DataModuleData> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      totalSales: {
        value: 126560,
        weekOverWeek: '12%',
        dayOverDay: '11%',
        dailySales: 12423,
      },
      visits: {
        value: 8846,
        dailyVisits: 1234,
      },
      payments: {
        value: 6560,
        conversionRate: '60%',
      },
    };
  },

  // 获取销售额图表数据
  getSalesChartData: async (range: string): Promise<SalesModuleData> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const chartDataMap: Record<string, any[]> = {
      year: [
        { date: '1月', value: 8000, type: '销售额' },
        { date: '2月', value: 5200, type: '销售额' },
        { date: '3月', value: 9300, type: '销售额' },
        { date: '4月', value: 7200, type: '销售额' },
        { date: '5月', value: 11000, type: '销售额' },
        { date: '6月', value: 13500, type: '销售额' },
        { date: '7月', value: 12800, type: '销售额' },
        { date: '8月', value: 14500, type: '销售额' },
        { date: '9月', value: 13200, type: '销售额' },
        { date: '10月', value: 15800, type: '销售额' },
        { date: '11月', value: 18200, type: '销售额' },
        { date: '12月', value: 21000, type: '销售额' },
      ],
      month: [
        { date: '1日', value: 3000, type: '销售额' },
        { date: '5日', value: 4500, type: '销售额' },
        { date: '10日', value: 3800, type: '销售额' },
        { date: '15日', value: 5200, type: '销售额' },
        { date: '20日', value: 4800, type: '销售额' },
        { date: '25日', value: 6100, type: '销售额' },
        { date: '30日', value: 5500, type: '销售额' },
      ],
      day: [
        { date: '00:00', value: 1200, type: '销售额' },
        { date: '04:00', value: 800, type: '销售额' },
        { date: '08:00', value: 2500, type: '销售额' },
        { date: '12:00', value: 4200, type: '销售额' },
        { date: '16:00', value: 3800, type: '销售额' },
        { date: '20:00', value: 5100, type: '销售额' },
        { date: '24:00', value: 2800, type: '销售额' },
      ],
    };

    const storeRanking = [
      { rank: 1, storeName: '工专路 0 号店', sales: 323234 },
      { rank: 2, storeName: '工专路 1 号店', sales: 278123 },
      { rank: 3, storeName: '工专路 2 号店', sales: 256789 },
      { rank: 4, storeName: '工专路 3 号店', sales: 234567 },
      { rank: 5, storeName: '工专路 4 号店', sales: 212345 },
      { rank: 6, storeName: '工专路 5 号店', sales: 198765 },
      { rank: 7, storeName: '工专路 6 号店', sales: 187654 },
    ];

    return {
      chartData: chartDataMap[range] || chartDataMap.month,
      storeRanking,
    };
  },
};

const AnalysisPage: React.FC = () => {
  const [dataModuleStatus, setDataModuleStatus] =
    useState<DataStatus>('loading');
  const [salesModuleStatus, setSalesModuleStatus] =
    useState<DataStatus>('loading');
  const [dataModuleData, setDataModuleData] = useState<
    DataModuleData | undefined
  >();
  const [salesModuleData, setSalesModuleData] = useState<
    SalesModuleData | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 加载数据模块数据
  const loadDataModule = useCallback(async () => {
    try {
      setDataModuleStatus('loading');
      const data = await mockDataService.getDataModule();
      setDataModuleData(data);
      setDataModuleStatus('success');
    } catch (_error) {
      setDataModuleStatus('error');
      setErrorMessage('数据加载失败，请稍后重试');
    }
  }, []);

  // 加载销售额模块数据
  const loadSalesModule = useCallback(async (range: string = 'month') => {
    try {
      setSalesModuleStatus('loading');
      const data = await mockDataService.getSalesChartData(range);
      setSalesModuleData(data);
      setSalesModuleStatus('success');
    } catch (_error) {
      setSalesModuleStatus('error');
      setErrorMessage('数据加载失败，请稍后重试');
    }
  }, []);

  // 处理日期范围变化
  const handleDateRangeChange = useCallback(
    (range: 'year' | 'month' | 'day') => {
      loadSalesModule(range);
    },
    [loadSalesModule],
  );

  // 初始加载
  useEffect(() => {
    loadDataModule();
    loadSalesModule('month');
  }, [loadDataModule, loadSalesModule]);

  return (
    <PageContainer className="analysis-page">
      {/* 数据模块 */}
      <div className="analysis-module">
        <DataModule
          data={dataModuleData}
          status={dataModuleStatus}
          errorMessage={errorMessage}
        />
      </div>

      {/* 销售额模块 */}
      <div className="analysis-module">
        <SalesModule
          data={salesModuleData}
          status={salesModuleStatus}
          errorMessage={errorMessage}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
    </PageContainer>
  );
};

export default AnalysisPage;
