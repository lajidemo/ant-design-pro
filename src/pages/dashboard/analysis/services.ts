export interface DataCardItem {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  trend?: {
    value: number;
    type: 'up' | 'down';
  };
  subData?: {
    label: string;
    value: number | string;
  }[];
}

export interface DataCardsData {
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
}

export interface SalesDataItem {
  date: string;
  sales: number;
}

export interface StoreRankingItem {
  rank: number;
  name: string;
  sales: number;
}

export interface DashboardData {
  dataCards: DataCardsData;
  salesData: SalesDataItem[];
  storeRanking: StoreRankingItem[];
}
