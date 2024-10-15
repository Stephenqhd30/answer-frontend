import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import {Drawer, message, Modal} from 'antd';
import React from 'react';
import { addScoringResultUsingPost } from '@/services/answer-backend/scoringResultController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.ScoringResultAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.ScoringResult>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.ScoringResultAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addScoringResultUsingPost({
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
const CreateScoringResultModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Modal
      destroyOnClose
      title={'创建评分结果'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer={null}
    >
      <ProTable
        columns={columns}
        rowKey={'id'}
        onSubmit={async (values: API.ScoringResultAddRequest) => {
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
export default CreateScoringResultModal;
