import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import React from 'react';
import {ProList} from '@ant-design/pro-components';
import {Space, Tag} from 'antd';

const BindingView: React.FC = () => {
  const getData = () => [
    {
      title: '绑定淘宝',
      description: '当前未绑定淘宝账号',
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: '绑定支付宝',
      description: '当前未绑定支付宝账号',
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: '绑定钉钉',
      description: '当前未绑定钉钉账号',
      avatar: <DingdingOutlined className="dingding" />,
    },
  ];

  return (
    <ProList
      rowKey="id"
      dataSource={getData()}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'title',
        },
        avatar: {
          dataIndex: 'avatar',
          editable: false,
        },
        description: {
          dataIndex: 'description',
        },
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.title);
              }}
              key="link"
            >
              绑定
            </a>,
          ],
        },
      }}
    />
  );
};

export default BindingView;
