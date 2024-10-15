import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { updateScoringResultUsingPost } from '@/services/answer-backend/scoringResultController';

interface UpdateProps {
  oldData?: API.ScoringResult;
  onCancel: () => void;
  onSubmit: (values: API.ScoringResultUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.ScoringResult>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ScoringResultUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateScoringResultUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateScoringResultModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新评分结果'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer={null}
    >
      <ProTable
        type={'form'}
        rowKey={'id'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.ScoringResultUpdateRequest) => {
          const success = await handleUpdate({
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
export default UpdateScoringResultModal;
