import { Image, Space, Typography } from 'antd';
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { ShareAltOutlined } from '@ant-design/icons';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { history } from '@@/core/history';

interface AppCardProps {
  app: API.AppVO;
}

const AppCard: React.FC<AppCardProps> = (props) => {
  const { app } = props;
  return (
    <ProCard
      bordered
      onClick={() => {
        history.push(`/app/detail/${app.id}`);
      }}
      title={app.appName}
      // @ts-ignore
      tooltip={appTypeEnum[app?.appType].text}
      extra={<ShareAltOutlined />}
      style={{ maxWidth: 320, marginBlockStart: 8 }}
    >
      <Space size={'middle'} direction="vertical">
        <Image preview={false} src={app.appIcon} />
        <Typography.Title level={5}>{app.appName}</Typography.Title>
        <span>{app.appDesc}</span>
        <UserAvatarCard user={app.userVO || {}} />
      </Space>
    </ProCard>
  );
};

export default AppCard;
