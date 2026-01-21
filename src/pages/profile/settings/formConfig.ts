import type { FormItemConfig } from './types';

// 基础信息表单配置
export const formConfig: FormItemConfig[] = [
  {
    name: 'nickname',
    label: 'profile.settings.nickname',
    type: 'input',
    placeholder: 'profile.settings.nickname.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.nickname.required',
      },
      {
        max: 20,
        message: 'profile.settings.nickname.max',
      },
    ],
  },
  {
    name: 'bio',
    label: 'profile.settings.bio',
    type: 'textarea',
    placeholder: 'profile.settings.bio.placeholder',
    rows: 4,
    rules: [
      {
        max: 200,
        message: 'profile.settings.bio.max',
      },
    ],
  },
];

// 地址信息表单配置
export const addressFormConfig: FormItemConfig[] = [
  {
    name: 'province',
    label: 'profile.settings.province',
    type: 'select',
    placeholder: 'profile.settings.province.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.province.required',
      },
    ],
  },
  {
    name: 'city',
    label: 'profile.settings.city',
    type: 'select',
    placeholder: 'profile.settings.city.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.city.required',
      },
    ],
  },
  {
    name: 'district',
    label: 'profile.settings.district',
    type: 'select',
    placeholder: 'profile.settings.district.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.district.required',
      },
    ],
  },
  {
    name: 'detailAddress',
    label: 'profile.settings.detailAddress',
    type: 'textarea',
    placeholder: 'profile.settings.detailAddress.placeholder',
    rows: 3,
    rules: [
      {
        required: true,
        message: 'profile.settings.detailAddress.required',
      },
      {
        max: 200,
        message: 'profile.settings.detailAddress.max',
      },
    ],
  },
];

// 联系方式表单配置
export const contactFormConfig: FormItemConfig[] = [
  {
    name: 'phone',
    label: 'profile.settings.phone',
    type: 'input',
    placeholder: 'profile.settings.phone.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.phone.required',
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: 'profile.settings.phone.format',
      },
    ],
  },
  {
    name: 'email',
    label: 'profile.settings.email',
    type: 'input',
    placeholder: 'profile.settings.email.placeholder',
    rules: [
      {
        required: true,
        message: 'profile.settings.email.required',
      },
      {
        type: 'email',
        message: 'profile.settings.email.format',
      },
    ],
  },
];

// 完整表单配置（用于其他模块复用）
export const completeFormConfig: FormItemConfig[] = [
  ...formConfig,
  ...addressFormConfig,
  ...contactFormConfig,
];
