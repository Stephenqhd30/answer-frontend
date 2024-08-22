import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { addQuestionUsingPost } from '@/services/stephen-backend/questionController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.QuestionAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.Question>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.QuestionAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addQuestionUsingPost({
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
const CreateQuestionModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Modal
      destroyOnClose
      title={'创建用户'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        columns={columns}
        onSubmit={async (values: API.QuestionAddRequest) => {
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
export default CreateQuestionModal;
