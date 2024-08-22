import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { updateAppUsingPost } from '@/services/stephen-backend/appController';
interface UpdateProps {
  oldData?: API.App;
  onCancel: () => void;
  onSubmit: (values: API.AppUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.App>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.AppUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateAppUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateAppModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新应用信息'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.AppUpdateRequest) => {
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
export default UpdateAppModal;
