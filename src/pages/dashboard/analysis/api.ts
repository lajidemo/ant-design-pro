// @ts-expect-error
/* eslint-disable */
import { request } from '@umijs/max';
import type { Dashboard } from './typings';

/** 获取仪表盘数据 GET /api/dashboard/analysis */
export async function getDashboardAnalysis(options?: { [key: string]: any }) {
  return request<Dashboard.DashboardResult>('/api/dashboard/analysis', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取销售额数据 GET /api/dashboard/sales */
export async function getDashboardSales(
  params: {
    range?: 'year' | 'month' | 'day';
  },
  options?: { [key: string]: any },
) {
  return request<Dashboard.SalesDataResult>('/api/dashboard/sales', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export type { Dashboard };
