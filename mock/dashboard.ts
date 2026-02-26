import type { Request, Response } from 'express';

const generateDashboardData = () => {
  const totalSales = Math.floor(Math.random() * 1000000) + 500000;
  const visitCount = Math.floor(Math.random() * 50000) + 10000;
  const paymentCount = Math.floor(Math.random() * 10000) + 1000;

  const salesData: Dashboard.SalesDataItem[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    salesData.push({
      date: `${date.getMonth() + 1}-${date.getDate()}`,
      sales: Math.floor(Math.random() * 50000) + 10000,
    });
  }

  const storeRanking: Dashboard.StoreRankingItem[] = [
    { rank: 1, name: '北京朝阳店', sales: 156000 },
    { rank: 2, name: '上海浦东店', sales: 142000 },
    { rank: 3, name: '广州天河店', sales: 128000 },
    { rank: 4, name: '深圳南山店', sales: 115000 },
    { rank: 5, name: '杭州西湖店', sales: 98000 },
    { rank: 6, name: '成都锦江店', sales: 87000 },
    { rank: 7, name: '武汉江汉店', sales: 76000 },
  ];

  return {
    dataCards: {
      totalSales: {
        value: totalSales,
        weekTrend: 12.5,
        dayTrend: 8.2,
        dailySales: Math.floor(totalSales / 30),
      },
      visitCount: {
        value: visitCount,
        dailyValue: Math.floor(visitCount / 30),
      },
      paymentCount: {
        value: paymentCount,
        conversionRate: Number(((paymentCount / visitCount) * 100).toFixed(2)),
      },
    },
    salesData,
    storeRanking,
  };
};

const generateSalesData = (range: 'year' | 'month' | 'day') => {
  const data: Dashboard.SalesDataItem[] = [];
  const now = new Date();

  let count = 30;
  if (range === 'year') count = 12;
  if (range === 'month') count = 30;
  if (range === 'day') count = 24;

  for (let i = count - 1; i >= 0; i--) {
    if (range === 'year') {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      data.push({
        date: `${date.getFullYear()}-${date.getMonth() + 1}`,
        sales: Math.floor(Math.random() * 500000) + 100000,
      });
    } else if (range === 'month') {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: `${date.getMonth() + 1}-${date.getDate()}`,
        sales: Math.floor(Math.random() * 50000) + 10000,
      });
    } else {
      data.push({
        date: `${i}:00`,
        sales: Math.floor(Math.random() * 5000) + 1000,
      });
    }
  }
  return data;
};

function getDashboardAnalysis(req: Request, res: Response) {
  const result = {
    data: generateDashboardData(),
    success: true,
  };
  return res.json(result);
}

function getDashboardSales(req: Request, res: Response) {
  const { range = 'month' } = req.query;
  const result = {
    data: generateSalesData(range as 'year' | 'month' | 'day'),
    success: true,
  };
  return res.json(result);
}

export default {
  'GET /api/dashboard/analysis': getDashboardAnalysis,
  'GET /api/dashboard/sales': getDashboardSales,
};
