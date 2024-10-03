import { Button, Flex, Typography } from 'antd';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import dayjs from 'dayjs';
import { ActionType, ProCard } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { history } from '@@/core/history';
import { EditAppModal } from '@/pages/App/components/index';

interface Props {
  appData: API.AppVO;
  isCreator: boolean;
  isCreate?: boolean;
}

const AppDetailsCard: React.FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  const { appData, isCreator, isCreate = true } = props;
  // 更新组件
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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
          {isCreator && <Button onClick={() => setEditModalVisible(true)}>修改应用</Button>}
        </Flex>
      )}
      {editModalVisible && (
        <EditAppModal
          onSubmit={() => {
            setEditModalVisible(false);
            actionRef.current?.reload();
          }}
          visible={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
          }}
          oldData={appData}
        />
      )}
    </ProCard>
  );
};

export default AppDetailsCard;
