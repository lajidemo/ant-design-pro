import { request } from '@umijs/max';

export interface TotalSalesData {
  totalSales: number;
  weeklyGrowth: number;
  dailyGrowth: number;
  todaySales: number;
}

export interface VisitsData {
  totalVisits: number;
  todayVisits: number;
}

export interface PaymentsData {
  totalPayments: number;
  conversionRate: number;
}

export interface SalesChartItem {
  date: string;
  sales: number;
  orders: number;
}

export interface StoreRankItem {
  rank: number;
  storeName: string;
  sales: number;
  orders: number;
}

export interface OverviewData {
  totalSales: TotalSalesData;
  visits: VisitsData;
  payments: PaymentsData;
}

export async function getTotalSales(): Promise<API.ResBody<TotalSalesData>> {
  return request('/api/dashboard/total-sales');
}

export async function getVisits(): Promise<API.ResBody<VisitsData>> {
  return request('/api/dashboard/visits');
}

export async function getPayments(): Promise<API.ResBody<PaymentsData>> {
  return request('/api/dashboard/payments');
}

export async function getSalesChart(params?: {
  year?: string;
  month?: string;
  day?: string;
}): Promise<API.ResBody<SalesChartItem[]>> {
  return request('/api/dashboard/sales-chart', { params });
}

export async function getStoreRank(): Promise<API.ResBody<StoreRankItem[]>> {
  return request('/api/dashboard/store-rank');
}

export async function getOverview(): Promise<API.ResBody<OverviewData>> {
  return request('/api/dashboard/overview');
}
