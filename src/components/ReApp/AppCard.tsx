import { Grid, Image, Space, Typography } from 'antd';
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { ShareAltOutlined } from '@ant-design/icons';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { history } from '@umijs/max';

interface AppCardProps {
  app: API.AppVO;
}

const {useBreakpoint} = Grid;

/**
 * 应用卡片
 * @param props
 * @constructor
 */
const AppCard: React.FC<AppCardProps> = (props) => {
  const { app } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.sm || !scene.md;
  return (
    <ProCard
      bordered
      onClick={async () => {
        history.push(`/app/detail/${app.id}`);
      }}
      title={app.appName}
      tooltip={appTypeEnum[app?.appType as AppType].text}
      extra={isMobile ? '' : <ShareAltOutlined />}
      style={{ maxWidth: 256, marginBlockStart: 8 }}
    >
      <Space size={'middle'} direction="vertical" wrap>
        <Image preview={false} src={app.appIcon} />
        <Typography.Title level={5}>{app.appName}</Typography.Title>
        <span>{app.appDesc}</span>
        <UserAvatarCard user={app.userVO || {}} />
      </Space>
    </ProCard>
  );
};

export default AppCard;
