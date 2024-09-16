import { Image, Space, Typography } from 'antd';
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { ShareAltOutlined } from '@ant-design/icons';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { history } from '@umijs/max';

interface AppCardProps {
  app: API.AppVO;
}

const AppCard: React.FC<AppCardProps> = (props) => {
  const { app } = props;
  return (
    <ProCard
      onClick={() => {
        history.push(`/app/details/${app.id}`);
      }}
      bordered
      title={app.appName}
      // @ts-ignore
      tooltip={appTypeEnum[app?.appType].text}
      extra={<ShareAltOutlined />}
      style={{ maxWidth: 320, marginBlockStart: 16 }}
    >
      <Space size={'middle'} direction="vertical">
        <Image src={app.appIcon} />
        <Typography.Title level={5}>{app.appName}</Typography.Title>
        <span>{app.appDesc}</span>
        <UserAvatarCard user={app.userVO || {}} />
      </Space>
    </ProCard>
  );
};

export default AppCard;
