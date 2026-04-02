import { Button, Card, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl, useRequest } from 'umi';
import { formConfig } from './formConfig';
import { fetchCities, fetchDistricts, fetchProvinces } from './services';
import type { AddressData } from './types';

const { TextArea } = Input;

const { Option } = Select;

const ProfileSettings = () => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<AddressData[]>([]);
  const [cities, setCities] = useState<AddressData[]>([]);
  const [districts, setDistricts] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  // 获取省份数据
  const { run: getProvinces, loading: provincesLoading } = useRequest(
    fetchProvinces,
    {
      onSuccess: (data) => {
        setProvinces(data);
      },
    },
  );

  // 获取城市数据
  const { run: getCities, loading: citiesLoading } = useRequest(fetchCities, {
    manual: true,
    onSuccess: (data) => {
      setCities(data);
      form.setFieldsValue({ city: undefined, district: undefined });
      setDistricts([]);
    },
  });

  // 获取区县数据
  const { run: getDistricts, loading: districtsLoading } = useRequest(
    fetchDistricts,
    {
      manual: true,
      onSuccess: (data) => {
        setDistricts(data);
        form.setFieldsValue({ district: undefined });
      },
    },
  );

  useEffect(() => {
    getProvinces();
  }, []);

  // 处理省份选择
  const handleProvinceChange = (provinceId: string) => {
    if (provinceId) {
      getCities(provinceId);
    } else {
      setCities([]);
      setDistricts([]);
      form.setFieldsValue({ city: undefined, district: undefined });
    }
  };

  // 处理城市选择
  const handleCityChange = (cityId: string) => {
    if (cityId) {
      getDistricts(cityId);
    } else {
      setDistricts([]);
      form.setFieldsValue({ district: undefined });
    }
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const _values = await form.validateFields();
      // 模拟提交
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success(
        intl.formatMessage({ id: 'profile.settings.submit.success' }),
      );
    } catch (_error) {
      message.error(
        intl.formatMessage({ id: 'profile.settings.submit.error' }),
      );
    } finally {
      setLoading(false);
    }
  };

  // 渲染表单项
  const renderFormItem = (config: any) => {
    return (
      <Form.Item
        key={config.name}
        name={config.name}
        label={intl.formatMessage({ id: config.label })}
        rules={config.rules?.map((rule: any) => ({
          ...rule,
          message: rule.message
            ? intl.formatMessage({ id: rule.message })
            : undefined,
        }))}
      >
        {config.type === 'input' && (
          <Input placeholder={intl.formatMessage({ id: config.placeholder })} />
        )}
        {config.type === 'textarea' && (
          <TextArea
            placeholder={intl.formatMessage({ id: config.placeholder })}
            rows={config.rows || 4}
          />
        )}
      </Form.Item>
    );
  };

  return (
    <Card title={intl.formatMessage({ id: 'profile.settings.title' })}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        validateTrigger="onBlur"
      >
        {/* 基本信息 */}
        <Card
          size="small"
          title={intl.formatMessage({ id: 'profile.settings.basicInfo' })}
          style={{ marginBottom: 24 }}
        >
          {formConfig.map(renderFormItem)}
        </Card>

        {/* 地址信息 */}
        <Card
          size="small"
          title={intl.formatMessage({ id: 'profile.settings.addressInfo' })}
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            name="province"
            label={intl.formatMessage({ id: 'profile.settings.province' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.province.required',
                }),
              },
            ]}
          >
            <Select
              placeholder={intl.formatMessage({
                id: 'profile.settings.province.placeholder',
              })}
              onChange={handleProvinceChange}
              loading={provincesLoading}
            >
              {provinces.map((province) => (
                <Option key={province.id} value={province.id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="city"
            label={intl.formatMessage({ id: 'profile.settings.city' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.city.required',
                }),
              },
            ]}
          >
            <Select
              placeholder={intl.formatMessage({
                id: 'profile.settings.city.placeholder',
              })}
              onChange={handleCityChange}
              loading={citiesLoading}
              disabled={!form.getFieldValue('province')}
            >
              {cities.map((city) => (
                <Option key={city.id} value={city.id}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label={intl.formatMessage({ id: 'profile.settings.district' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.district.required',
                }),
              },
            ]}
          >
            <Select
              placeholder={intl.formatMessage({
                id: 'profile.settings.district.placeholder',
              })}
              loading={districtsLoading}
              disabled={!form.getFieldValue('city')}
            >
              {districts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="detailAddress"
            label={intl.formatMessage({ id: 'profile.settings.detailAddress' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.detailAddress.required',
                }),
              },
              {
                max: 200,
                message: intl.formatMessage({
                  id: 'profile.settings.detailAddress.max',
                }),
              },
            ]}
          >
            <TextArea
              placeholder={intl.formatMessage({
                id: 'profile.settings.detailAddress.placeholder',
              })}
              rows={3}
            />
          </Form.Item>
        </Card>

        {/* 联系方式 */}
        <Card
          size="small"
          title={intl.formatMessage({ id: 'profile.settings.contactInfo' })}
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'profile.settings.phone' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.phone.required',
                }),
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: intl.formatMessage({
                  id: 'profile.settings.phone.format',
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'profile.settings.phone.placeholder',
              })}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={intl.formatMessage({ id: 'profile.settings.email' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'profile.settings.email.required',
                }),
              },
              {
                type: 'email',
                message: intl.formatMessage({
                  id: 'profile.settings.email.format',
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'profile.settings.email.placeholder',
              })}
            />
          </Form.Item>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {intl.formatMessage({ id: 'profile.settings.submit' })}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileSettings;
