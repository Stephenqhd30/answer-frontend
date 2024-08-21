import { Footer } from '@/components';
import { LoginFormPage } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Divider, message, Space, Tabs, theme, Typography } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import { BACKGROUND_IMAGE, STEPHEN_SUBTITLE, STEPHEN_TITLE } from '@/constants';
import AccountLoginPage from '@/pages/User/Login/components/AccountLoginPage';
import { userLoginUsingPost } from '@/services/stephen-backend/userController';
import { AlipayOutlined, TaobaoOutlined, WeiboOutlined } from '@ant-design/icons';
import PhoneLoginPage from '@/pages/User/Login/components/PhoneLoginPage';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pote',
};


const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { token } = theme.useToken();
  const {initialState, setInitialState} = useModel('@@initialState');
  const [redirected, setRedirected] = useState(false); // 控制重定向状态
  const {styles} = useStyles();
  // 用户登录
  const handleLoginSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      // 保存已登录的用户信息
      setInitialState({
        ...initialState,
        currentUser: res?.data,
      });
      setRedirected(true); // 设置重定向状态为 true
      message.success('登录成功！');
    } catch (error: any) {
      message.error(`登录失败${error.message}, 请重试！`);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    }
  }, [redirected]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{STEPHEN_TITLE}</title>
      </Helmet>
      <div
        style={{
          flex: '1 auto',
          padding: '16',
        }}
      >
        {/*用户登录的表单*/}
        <LoginFormPage
          backgroundImageUrl={BACKGROUND_IMAGE}
          containerStyle={{
            backdropFilter: 'blur(4px)',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title={STEPHEN_TITLE}
          subTitle={STEPHEN_SUBTITLE}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleLoginSubmit(values as API.UserLoginRequest);
          }}
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Divider plain>
                <span
                  style={{
                    color: token.colorTextPlaceholder,
                    fontWeight: 'normal',
                    fontSize: 14,
                  }}
                >
                  其他登录方式
                </span>
              </Divider>
              <Space align="center" size={24}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid ' + token.colorPrimaryBorder,
                    borderRadius: '50%',
                  }}
                >
                  <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid ' + token.colorPrimaryBorder,
                    borderRadius: '50%',
                  }}
                >
                  <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 40,
                    width: 40,
                    border: '1px solid ' + token.colorPrimaryBorder,
                    borderRadius: '50%',
                  }}
                >
                  <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography.Link href={'/user/register'}>去注册</Typography.Link>
                </div>
              </Space>
            </div>
          }
        >
          <Tabs centered activeKey={type} onChange={(activeKey) => setType(activeKey)}>
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
          {/*用户选择账号密码登录*/}
          {type === 'account' && <AccountLoginPage />}
          {type === 'phone' && <PhoneLoginPage />}
        </LoginFormPage>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
