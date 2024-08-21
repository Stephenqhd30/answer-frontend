import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { ProFormText } from '@ant-design/pro-components';

const RegisterPage: React.FC = () => (
  <>
    {/* 用户注册填写的表单 */}
    <ProFormText
      name="userAccount"
      fieldProps={{
        size: 'large',
        prefix: <UserOutlined />,
      }}
      placeholder={'请输入账号'}
      rules={[
        {
          required: true,
          message: '账号是必填项！',
        },
        {
          min: 4,
          type: 'string',
          message: '账号长度过短！',
        },
      ]}
    />
    <ProFormText.Password
      name="userPassword"
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined />,
      }}
      placeholder={'请输入密码'}
      rules={[
        {
          required: true,
          message: '密码是必填项！',
        },
        {
          min: 8,
          type: 'string',
          message: '请至少输入8位！',
        },
      ]}
    />
    <ProFormText.Password
      name="checkPassword"
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined />,
      }}
      placeholder={'请再次输入密码'}
      rules={[
        {
          required: true,
          message: '密码是必填项！',
        },
        {
          min: 8,
          type: 'string',
          message: '请至少输入8位！',
        },
      ]}
    />
  </>
);

export default RegisterPage;
