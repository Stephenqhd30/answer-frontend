import { Footer } from '@/components';
import { LoginFormPage } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import { BACKGROUND_IMAGE, STEPHEN_SUBTITLE, STEPHEN_TITLE } from '@/constants';
import { userRegisterUsingPost } from '@/services/stephen-backend/userController';
import RegisterPage from '@/pages/User/Register/components/RegisterPage';

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

const Login: React.FC = () => {
  const [redirected, setRedirected] = useState(false); // 控制重定向状态
  const { styles } = useStyles();

  // 用户注册
  const handleRegisterSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      await userRegisterUsingPost({
        ...values,
      });
      const defaultLoginSuccessMessage = '注册成功！';
      message.success(defaultLoginSuccessMessage);
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `注册失败${error.message}, 请重试！`;
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/user/login');
    }
  }, [redirected]);

  return (
    <div className={styles.container}>
      <div
        style={{
          flex: '1 auto',
          padding: '0',
        }}
      >
        {/*用户登录的表单*/}
        <LoginFormPage
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
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
            await handleRegisterSubmit(values as API.UserRegisterRequest);
            setRedirected(true);
          }}
        >
          <RegisterPage />
        </LoginFormPage>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
