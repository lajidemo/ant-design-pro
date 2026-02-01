export interface DashboardData {
  dataOverview: {
    totalSales: {
      value: number;
      weekOnWeek: number;
      dayOnDay: number;
      todaySales: number;
    };
    visits: {
      value: number;
      todayVisits: number;
    };
    paymentCount: {
      value: number;
      conversionRate: number;
    };
  };
  salesData: Array<{
    date: string;
    sales: number;
  }>;
  storeRanking: Array<{
    id: string;
    name: string;
    sales: number;
    percentage: number;
  }>;
}

export interface DashboardQueryParams {
  startDate: string;
  endDate: string;
  filterType: 'day' | 'week' | 'month' | 'year';
}

export interface DataOverviewProps {
  data?: DashboardData['dataOverview'];
  loading?: boolean;
}

export interface SalesChartProps {
  data?: DashboardData['salesData'];
  loading?: boolean;
}

export interface StoreRankingProps {
  data?: DashboardData['storeRanking'];
  loading?: boolean;
}
