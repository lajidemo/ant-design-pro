import type { AddressData } from './types';

// 模拟省份数据
const mockProvinces: AddressData[] = [
  { id: '110000', name: '北京市' },
  { id: '310000', name: '上海市' },
  { id: '440000', name: '广东省' },
  { id: '330000', name: '浙江省' },
];

// 模拟城市数据
const mockCities: Record<string, AddressData[]> = {
  '110000': [{ id: '110100', name: '北京市' }],
  '310000': [{ id: '310100', name: '上海市' }],
  '440000': [
    { id: '440100', name: '广州市' },
    { id: '440300', name: '深圳市' },
  ],
  '330000': [
    { id: '330100', name: '杭州市' },
    { id: '330200', name: '宁波市' },
  ],
};

// 模拟区县数据
const mockDistricts: Record<string, AddressData[]> = {
  '110100': [
    { id: '110101', name: '东城区' },
    { id: '110102', name: '西城区' },
    { id: '110105', name: '朝阳区' },
  ],
  '310100': [
    { id: '310101', name: '黄浦区' },
    { id: '310104', name: '徐汇区' },
    { id: '310115', name: '浦东新区' },
  ],
  '440100': [
    { id: '440103', name: '荔湾区' },
    { id: '440104', name: '越秀区' },
    { id: '440111', name: '白云区' },
  ],
  '440300': [
    { id: '440303', name: '罗湖区' },
    { id: '440304', name: '福田区' },
    { id: '440305', name: '南山区' },
  ],
  '330100': [
    { id: '330102', name: '上城区' },
    { id: '330103', name: '下城区' },
    { id: '330104', name: '江干区' },
  ],
  '330200': [
    { id: '330203', name: '海曙区' },
    { id: '330205', name: '江北区' },
    { id: '330206', name: '北仑区' },
  ],
};

// 获取省份列表
export const fetchProvinces = async (): Promise<AddressData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProvinces);
    }, 300);
  });
};

// 根据省份ID获取城市列表
export const fetchCities = async (
  provinceId: string,
): Promise<AddressData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCities[provinceId] || []);
    }, 200);
  });
};

// 根据城市ID获取区县列表
export const fetchDistricts = async (
  cityId: string,
): Promise<AddressData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDistricts[cityId] || []);
    }, 200);
  });
};
