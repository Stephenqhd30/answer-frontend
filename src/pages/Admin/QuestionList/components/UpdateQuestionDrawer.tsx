import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import {Drawer, message, Modal} from 'antd';
import React from 'react';
import {updateQuestionUsingPost} from '@/services/stephen-backend/questionController';

interface UpdateProps {
  oldData?: API.Question;
  onCancel: () => void;
  onSubmit: (values: API.QuestionUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.Question>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateQuestionUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateQuestionDrawer: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer
      destroyOnClose
      title={'更新用户信息'}
      open={visible}
      width={640}
      onClose={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.QuestionUpdateRequest) => {
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
export default UpdateQuestionDrawer;
