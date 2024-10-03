import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Select } from 'antd';
import React from 'react';
import { editAppUsingPost } from '@/services/stephen-backend/appController';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';

interface Props {
  oldData?: API.AppVO;
  onCancel: () => void;
  onSubmit: (values: API.AppEditRequest) => void;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleEdit = async (fields: API.AppEditRequest) => {
  const hide = message.loading('正在更新');
  try {
    await editAppUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};

const EditAppCard: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'编辑应用信息'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProTable
        type={'form'}
        rowKey={'id'}
        form={{
          initialValues: oldData,
        }}
        columns={[
          {
            dataIndex: 'appName',
            title: '应用名称',
            valueType: 'text',
          },
          {
            dataIndex: 'appDesc',
            title: '应用简介',
            valueType: 'textarea',
          },
          {
            dataIndex: 'appType',
            title: '应用类型',
            valueType: 'select',
            valueEnum: appTypeEnum,
            renderFormItem: () => {
              return (
                <Select>
                  <Select.Option value={AppType.SCORE}>
                    {appTypeEnum[AppType.SCORE].text}
                  </Select.Option>
                  <Select.Option value={AppType.TEXT}>
                    {appTypeEnum[AppType.TEXT].text}
                  </Select.Option>
                </Select>
              );
            },
          },
          {
            dataIndex: 'scoringStrategy',
            title: '评分策略',
            valueType: 'select',
            valueEnum: scoringStrategyEnum,
            renderFormItem: () => {
              return (
                <Select>
                  <Select.Option value={ScoringStrategy.AI}>
                    {scoringStrategyEnum[ScoringStrategy.AI].text}
                  </Select.Option>
                  <Select.Option value={ScoringStrategy.CUSTOM}>
                    {scoringStrategyEnum[ScoringStrategy.CUSTOM].text}
                  </Select.Option>
                </Select>
              );
            },
          },
          {
            dataIndex: 'appIcon',
            title: '应用封面',
            valueType: 'image',
          },
        ]}
        onSubmit={async (values: API.UserUpdateRequest) => {
          const success = await handleEdit({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default EditAppCard;
