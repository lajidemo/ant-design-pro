import {
  ClockCircleOutlined,
  ProductOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, Table, Tag, Timeline } from 'antd';
import React from 'react';

// Mock数据
const refundData = {
  refundInfo: {
    refundId: 'RF2023052012345678',
    orderId: 'OD2023051987654321',
    refundAmount: 299.0,
    refundReason: '商品质量问题',
    refundStatus: 'processing',
    applyTime: '2023-05-20 14:30:25',
    expectedTime: '2023-05-25 23:59:59',
  },
  userInfo: {
    userId: 'U00123456',
    userName: '张三',
    phoneNumber: '138****8888',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区某某街道123号',
  },
  refundProducts: [
    {
      id: 1,
      productId: 'P001',
      productName: '无线蓝牙耳机',
      productImage:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      quantity: 1,
      unitPrice: 299.0,
      totalPrice: 299.0,
      refundReason: '商品无法正常连接',
    },
  ],
  refundProgress: [
    {
      id: 'step1',
      time: '2023-05-20 14:30:25',
      title: '提交退款申请',
      description: '用户提交了退款申请，等待审核',
    },
    {
      id: 'step2',
      time: '2023-05-20 15:45:12',
      title: '审核通过',
      description: '退款申请审核通过，等待用户退货',
    },
    {
      id: 'step3',
      time: '',
      title: '商家收到退货',
      description: '商家收到退货后将进行退款处理',
    },
    {
      id: 'step4',
      time: '',
      title: '退款完成',
      description: '退款已成功到账',
    },
  ],
};

const RefundDetail: React.FC = () => {
  // 商品表格列配置
  const productColumns = [
    {
      title: '商品信息',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.productImage}
            alt={text}
            style={{ width: 80, height: 80, marginRight: 16 }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '商品ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '小计',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '退款原因',
      dataIndex: 'refundReason',
      key: 'refundReason',
    },
  ];

  // 状态标签
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'processing':
        return <Tag color="processing">处理中</Tag>;
      case 'approved':
        return <Tag color="success">已通过</Tag>;
      case 'rejected':
        return <Tag color="error">已拒绝</Tag>;
      case 'completed':
        return <Tag color="success">已完成</Tag>;
      default:
        return <Tag color="default">未知状态</Tag>;
    }
  };

  return (
    <PageContainer
      title="退款详情"
      breadcrumb={{
        items: [
          { name: '首页', path: '/' },
          { name: '退款管理', path: '/refund' },
          { name: '退款详情' },
        ],
      }}
    >
      {/* 退款申请信息 */}
      <Card
        title={
          <span>
            <SwapOutlined /> 退款申请信息
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="退款单号">
            {refundData.refundInfo.refundId}
          </Descriptions.Item>
          <Descriptions.Item label="订单单号">
            {refundData.refundInfo.orderId}
          </Descriptions.Item>
          <Descriptions.Item label="退款金额">
            ¥{refundData.refundInfo.refundAmount.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="退款状态">
            {getStatusTag(refundData.refundInfo.refundStatus)}
          </Descriptions.Item>
          <Descriptions.Item label="退款原因" span={2}>
            {refundData.refundInfo.refundReason}
          </Descriptions.Item>
          <Descriptions.Item label="申请时间">
            {refundData.refundInfo.applyTime}
          </Descriptions.Item>
          <Descriptions.Item label="预计到账时间">
            {refundData.refundInfo.expectedTime}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {/* 用户信息 */}
        <Card
          title={
            <span>
              <UserOutlined /> 用户信息
            </span>
          }
          style={{ flex: 1 }}
        >
          <Descriptions column={1}>
            <Descriptions.Item label="用户ID">
              {refundData.userInfo.userId}
            </Descriptions.Item>
            <Descriptions.Item label="用户姓名">
              {refundData.userInfo.userName}
            </Descriptions.Item>
            <Descriptions.Item label="手机号码">
              {refundData.userInfo.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="电子邮箱">
              {refundData.userInfo.email}
            </Descriptions.Item>
            <Descriptions.Item label="收货地址">
              {refundData.userInfo.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 退款进度 */}
        <Card
          title={
            <span>
              <ClockCircleOutlined /> 退款进度
            </span>
          }
          style={{ flex: 1 }}
        >
          <Timeline>
            {refundData.refundProgress.map((item) => (
              <Timeline.Item
                key={item.id}
                color={item.time ? 'green' : 'gray'}
                dot={
                  item.time ? <ClockCircleOutlined /> : <ClockCircleOutlined />
                }
              >
                <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                <div style={{ color: '#666', marginTop: 4 }}>
                  {item.description}
                </div>
                {item.time && (
                  <div style={{ color: '#999', marginTop: 4, fontSize: 12 }}>
                    {item.time}
                  </div>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </div>

      {/* 退货商品 */}
      <Card
        title={
          <span>
            <ProductOutlined /> 退货商品
          </span>
        }
      >
        <Table
          columns={productColumns}
          dataSource={refundData.refundProducts}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </PageContainer>
  );
};

export default RefundDetail;
