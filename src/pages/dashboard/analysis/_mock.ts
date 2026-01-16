import type { Request, Response } from 'express';

export default {
  'GET /api/dashboard/analysis': (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const salesData = generateSalesData(startDate as string, endDate as string);
    const storeRanking = generateStoreRanking();

    res.json({
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
    });
  },
};

function generateSalesData(
  startDate: string,
  endDate: string,
): Array<{ date: string; value: number }> {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
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
