import type { DashboardData, DashboardQueryParams } from './types';

export async function getDashboardData(
  _params: DashboardQueryParams,
): Promise<DashboardData> {
  // 模拟API调用，实际项目中替换为真实的API端点
  return new Promise((resolve) => {
    setTimeout(() => {
      // 生成模拟数据
      const mockData = {
        dataOverview: {
          totalSales: {
            value: 1234567.89,
            weekOnWeek: 12.5,
            dayOnDay: 5.3,
            todaySales: 123456.78,
          },
          visits: {
            value: 98765,
            todayVisits: 12345,
          },
          paymentCount: {
            value: 45678,
            conversionRate: 3.2,
          },
        },
        salesData: Array.from({ length: 30 }, (_, i) => ({
          date: `2024-01-${String(i + 1).padStart(2, '0')}`,
          sales: Math.floor(Math.random() * 100000) + 50000,
        })),
        storeRanking: Array.from({ length: 10 }, (_, i) => ({
          id: `store-${i + 1}`,
          name: `门店${i + 1}`,
          sales: Math.floor(Math.random() * 100000) + 10000,
          percentage: Math.floor(Math.random() * 100),
        })).sort((a, b) => b.sales - a.sales),
      };
      resolve(mockData);
    }, 500);
  });
}

// 实际项目中，可以使用以下代码替换上面的模拟数据：
/*
export async function getDashboardData(params: DashboardQueryParams) {
  return request('/api/dashboard/analysis', {
    method: 'GET',
    params,
  });
}
*/
