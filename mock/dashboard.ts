import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const getTotalSalesData = () => ({
  totalSales: 1234567.89,
  weeklyGrowth: 12.5,
  dailyGrowth: 5.2,
  todaySales: 45678.90,
});

const getVisitsData = () => ({
  totalVisits: 88488,
  todayVisits: 3456,
});

const getPaymentsData = () => ({
  totalPayments: 12345,
  conversionRate: 68.5,
});

const getSalesChartData = () => [
  { date: '2024-01', sales: 120000, orders: 320 },
  { date: '2024-02', sales: 98000, orders: 280 },
  { date: '2024-03', sales: 145000, orders: 410 },
  { date: '2024-04', sales: 132000, orders: 380 },
  { date: '2024-05', sales: 168000, orders: 450 },
  { date: '2024-06', sales: 155000, orders: 420 },
  { date: '2024-07', sales: 189000, orders: 510 },
  { date: '2024-08', sales: 176000, orders: 480 },
  { date: '2024-09', sales: 198000, orders: 530 },
  { date: '2024-10', sales: 210000, orders: 560 },
  { date: '2024-11', sales: 235000, orders: 620 },
  { date: '2024-12', sales: 280000, orders: 720 },
];

const getStoreRankData = () => [
  { rank: 1, storeName: '北京朝阳门店', sales: 456789, orders: 1234 },
  { rank: 2, storeName: '上海浦东门店', sales: 398765, orders: 1098 },
  { rank: 3, storeName: '广州天河门店', sales: 345678, orders: 987 },
  { rank: 4, storeName: '深圳南山门店', sales: 312345, orders: 912 },
  { rank: 5, storeName: '杭州西湖门店', sales: 289456, orders: 856 },
];

export default {
  'GET /api/dashboard/total-sales': async (_req: Request, res: Response) => {
    await waitTime(300);
    return res.json({
      success: true,
      data: getTotalSalesData(),
    });
  },

  'GET /api/dashboard/visits': async (_req: Request, res: Response) => {
    await waitTime(300);
    return res.json({
      success: true,
      data: getVisitsData(),
    });
  },

  'GET /api/dashboard/payments': async (_req: Request, res: Response) => {
    await waitTime(300);
    return res.json({
      success: true,
      data: getPaymentsData(),
    });
  },

  'GET /api/dashboard/sales-chart': async (req: Request, res: Response) => {
    await waitTime(400);
    const { year, month, day } = req.query;
    const data = getSalesChartData();
    return res.json({
      success: true,
      data,
      params: { year, month, day },
    });
  },

  'GET /api/dashboard/store-rank': async (_req: Request, res: Response) => {
    await waitTime(300);
    return res.json({
      success: true,
      data: getStoreRankData(),
    });
  },

  'GET /api/dashboard/overview': async (_req: Request, res: Response) => {
    await waitTime(500);
    return res.json({
      success: true,
      data: {
        totalSales: getTotalSalesData(),
        visits: getVisitsData(),
        payments: getPaymentsData(),
      },
    });
  },
};
