import { Button, Flex, Typography } from 'antd';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import dayjs from 'dayjs';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import { history } from '@@/core/history';

interface Props {
  appData: API.AppVO;
  isCreator: boolean;
  isCreate?: boolean;
}

const AppDetailsCard: React.FC<Props> = (props) => {
  const { appData, isCreator, isCreate = true } = props;
  return (
    <ProCard bordered={false}>
      <Typography.Title level={2}>{appData.appName}</Typography.Title>
      <Typography.Paragraph>{appData.appDesc}</Typography.Paragraph>
      <Typography.Paragraph>
        应用类型:{' '}
        {appData?.appType !== undefined ? appTypeEnum[appData.appType as AppType]?.text : '未知'}
      </Typography.Paragraph>
      <Typography.Paragraph>
        评分策略:{' '}
        {appData?.scoringStrategy !== undefined
          ? scoringStrategyEnum[appData.scoringStrategy as ScoringStrategy]?.text
          : '未知'}
      </Typography.Paragraph>
      <Typography.Paragraph>
        作者: <UserAvatarCard user={appData?.userVO || {}} />
      </Typography.Paragraph>
      <Typography.Paragraph>
        创建时间: {dayjs(appData.createTime).format('YYYY-MM-DD HH:mm:ss')}
      </Typography.Paragraph>
      {isCreate && (
        <Flex gap="small" wrap>
          <Button type="primary">开始答题</Button>
          <Button>分享应用</Button>
          {isCreator && (
            <Button onClick={() => history.push(`/add/question/${appData?.id}`)}>设置题目</Button>
          )}
          {isCreator && (
            <Button onClick={() => history.push(`/add/scoring_result/${appData?.id}`)}>
              设置评分
            </Button>
          )}
          {isCreator && (
            <Button onClick={() => history.push(`/add/app/${appData?.id}`)}>修改应用</Button>
          )}
        </Flex>
      )}
    </ProCard>
  );
};

export default AppDetailsCard;
