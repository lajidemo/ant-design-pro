import { request } from '@umijs/max';

export interface DashboardParams {
  startDate: string;
  endDate: string;
  granularity?: 'day' | 'month' | 'year';
}

export interface DashboardData {
  totalSales: {
    total: number;
    weekOverWeek: number;
    dayOverDay: number;
    daily: number;
  };
  visits: {
    total: number;
    daily: number;
  };
  paymentCount: {
    total: number;
    conversionRate: number;
  };
  salesData: Array<{
    date: string;
    value: number;
  }>;
  storeRanking: Array<{
    name: string;
    sales: number;
    rank: number;
  }>;
}

export async function fetchDashboardData(
  params: DashboardParams,
): Promise<DashboardData> {
  return request<DashboardData>('/api/dashboard/analysis', {
    method: 'GET',
    params,
  });
}

export async function fetchDashboardDataMock(
  params: DashboardParams,
): Promise<DashboardData> {
  const { startDate, endDate, granularity = 'day' } = params;

  const salesData = generateSalesData(startDate, endDate, granularity);
  const storeRanking = generateStoreRanking();

  return {
    totalSales: {
      total: 125680.5,
      weekOverWeek: 12.5,
      dayOverDay: 5.8,
      daily: 18520.3,
    },
    visits: {
      total: 45678,
      daily: 6525,
    },
    paymentCount: {
      total: 3256,
      conversionRate: 7.13,
    },
    salesData,
    storeRanking,
  };
}

function generateSalesData(
  startDate: string,
  endDate: string,
  granularity: 'day' | 'month' | 'year',
): Array<{ date: string; value: number }> {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (granularity === 'day') {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= diffDays; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 20000) + 10000,
      });
    }
  } else if (granularity === 'month') {
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    const yearDiff = end.getFullYear() - start.getFullYear();
    const totalMonths = yearDiff * 12 + endMonth - startMonth;

    for (let i = 0; i <= totalMonths; i++) {
      const date = new Date(start);
      date.setMonth(startMonth + i);
      data.push({
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        value: Math.floor(Math.random() * 600000) + 300000,
      });
    }
  } else if (granularity === 'year') {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      data.push({
        date: String(year),
        value: Math.floor(Math.random() * 7000000) + 4000000,
      });
    }
  }

  return data;
}

function generateStoreRanking(): Array<{
  name: string;
  sales: number;
  rank: number;
}> {
  const stores = [
    '北京朝阳店',
    '上海浦东店',
    '广州天河店',
    '深圳南山店',
    '杭州西湖店',
    '成都锦江店',
    '武汉江汉店',
    '南京鼓楼店',
  ];

  return stores
    .map((name, index) => ({
      name,
      sales: Math.floor(Math.random() * 50000) + 20000,
      rank: index + 1,
    }))
    .sort((a, b) => b.sales - a.sales)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
