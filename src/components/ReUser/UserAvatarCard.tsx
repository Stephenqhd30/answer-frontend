import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React from 'react';

interface UserAvatarCardProps {
  user: API.User;
}

const UserAvatarCard: React.FC<UserAvatarCardProps> = (props) => {
  const { user } = props;
  return (
    <Space>
      {user?.userAvatar ? <Avatar src={user?.userAvatar} /> : <Avatar icon={<UserOutlined />} />}
      <span>{user?.userName}</span>
    </Space>
  );
};

export default UserAvatarCard;
