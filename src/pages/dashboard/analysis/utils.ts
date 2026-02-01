/**
 * 格式化数字，超过1万显示为"万"
 * @param num 数字
 * @returns 格式化后的字符串
 */
export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(2)}万`;
  }
  return num.toLocaleString();
};

/**
 * 格式化百分比
 * @param num 百分比数值
 * @returns 格式化后的百分比字符串
 */
export const formatPercent = (num: number): string => {
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

/**
 * 格式化金额
 * @param amount 金额
 * @returns 格式化后的金额字符串
 */
export const formatCurrency = (amount: number): string => {
  return `¥${formatNumber(amount)}`;
};

/**
 * 根据百分比获取进度条颜色
 * @param percentage 百分比
 * @returns 颜色值
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) return '#52c41a';
  if (percentage >= 60) return '#1890ff';
  if (percentage >= 40) return '#faad14';
  return '#ff4d4f';
};

/**
 * 格式化日期
 * @param date 日期对象
 * @returns 格式化后的日期字符串 (YYYY-MM-DD)
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
