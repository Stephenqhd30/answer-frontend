import { Button, Space } from 'antd';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { scoringStrategyEnum } from '@/enum/ScoringStrategy';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { ActionType, ProCard, ProDescriptions } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { history } from '@@/core/history';
import { EditAppModal } from '@/pages/App/components/index';

interface Props {
  appData: API.AppVO;
  isCreator: boolean;
}

/**
 * 应用详情卡片
 * @param props
 * @constructor
 */
const AppDetailsCard: React.FC<Props> = (props) => {
  const { appData, isCreator } = props;
  const actionRef = useRef<ActionType>();
  // 更新组件
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  return (
    <ProCard bordered={false}>
      <ProDescriptions<API.AppVO>
        actionRef={actionRef}
        column={1}
        title={appData.appName}
        dataSource={appData}
      >
        <ProDescriptions.Item dataIndex="appDesc" label="应用描述" valueType="text" />
        <ProDescriptions.Item
          dataIndex="appType"
          label="应用类型"
          valueType="select"
          valueEnum={appTypeEnum}
        />
        <ProDescriptions.Item
          dataIndex="scoringStrategy"
          label="评分策略"
          valueType="select"
          valueEnum={scoringStrategyEnum}
        />
        <ProDescriptions.Item
          dataIndex="userVO"
          label="作者"
          render={() => {
            return <UserAvatarCard user={appData?.userVO || {}} />;
          }}
        />
        <ProDescriptions.Item dataIndex="createTime" label="创建时间" valueType="dateTime" />
        <Space size="small" wrap>
          <Button type="primary">开始答题</Button>
          <Button>分享应用</Button>
          {isCreator && (
            <Button onClick={() => history.push(`/create/question/${appData?.id}`)}>设置题目</Button>
          )}
          {isCreator && (
            <Button onClick={() => history.push(`/create/scoring_result/${appData?.id}`)}>
              设置评分
            </Button>
          )}
          {isCreator && <Button onClick={() => setEditModalVisible(true)}>修改应用</Button>}
        </Space>
      </ProDescriptions>

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
