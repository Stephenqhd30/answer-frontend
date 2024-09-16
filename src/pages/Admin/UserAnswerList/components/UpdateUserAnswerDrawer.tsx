import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import { updateUserAnswerUsingPost } from '@/services/stephen-backend/userAnswerController';

interface UpdateProps {
  oldData?: API.UserAnswer;
  onCancel: () => void;
  onSubmit: (values: API.UserAnswerUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.UserAnswer>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserAnswerUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateUserAnswerUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateUserAnswerAnswerModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer
      destroyOnClose
      title={'更新用户回答'}
      open={visible}
      width={520}
      onClose={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        rowKey={'id'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.UserAnswerUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Drawer>
  );
};
export default UpdateUserAnswerAnswerModal;
