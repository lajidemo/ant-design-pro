// @ts-ignore
/* eslint-disable */

declare namespace Dashboard {
  type DataCardsData = {
    totalSales: {
      value: number;
      weekTrend: number;
      dayTrend: number;
      dailySales: number;
    };
    visitCount: {
      value: number;
      dailyValue: number;
    };
    paymentCount: {
      value: number;
      conversionRate: number;
    };
  };

  type SalesDataItem = {
    date: string;
    sales: number;
  };

  type StoreRankingItem = {
    rank: number;
    name: string;
    sales: number;
  };

  type DashboardData = {
    dataCards: DataCardsData;
    salesData: SalesDataItem[];
    storeRanking: StoreRankingItem[];
  };

  type DashboardResult = {
    data?: DashboardData;
    success?: boolean;
  };

  type SalesDataResult = {
    data?: SalesDataItem[];
    success?: boolean;
  };
}

export { Dashboard };
