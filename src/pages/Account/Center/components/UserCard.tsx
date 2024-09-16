import '@umijs/max';
import { Image } from 'antd';
import React from 'react';
import { IdcardOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';

interface UserProps {
  user: API.User;
}

const UserInfoCard: React.FC<UserProps> = (props) => {
  const { user } = props;

  return (
    <>
      <Image style={{ maxWidth: 420, marginBottom: 24 }} src={user?.userAvatar} />
      <p>
        <IdcardOutlined
          style={{
            marginRight: 8,
          }}
        />
        {user?.userName}
      </p>
      <p>
        <SmileOutlined
          style={{
            marginRight: 8,
          }}
        />
        {user?.userProfile}
      </p>
      <p>
        <UserOutlined
          style={{
            marginRight: 8,
          }}
        />
        {user?.userRole === 'admin' ? '管理员' : '普通用户'}
      </p>
    </>
  );
};
export default UserInfoCard;
