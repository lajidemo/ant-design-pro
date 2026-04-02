// 地址数据类型
export interface AddressData {
  id: string;
  name: string;
}

// 表单数据类型
export interface ProfileFormData {
  nickname: string;
  bio: string;
  province: string;
  city: string;
  district: string;
  detailAddress: string;
  phone: string;
  email: string;
}

// 表单配置项类型
export interface FormItemConfig {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'select' | 'date' | 'upload';
  placeholder: string;
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    max?: number;
    min?: number;
    type?: string;
  }>;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  rows?: number;
}
