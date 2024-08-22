import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { addUserAnswerUsingPost } from '@/services/stephen-backend/userAnswerController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.UserAnswerAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.UserAnswer>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.UserAnswerAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addUserAnswerUsingPost({
      ...fields,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateUserAnswerModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Modal
      destroyOnClose
      title={'创建用户回答'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        columns={columns}
        onSubmit={async (values: API.UserAnswerAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Modal>
  );
};
export default CreateUserAnswerModal;
