import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import { updateUserUsingPost } from '@/services/stephen-backend/userController';

interface UpdateProps {
  oldData?: API.User;
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.User>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateUserUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateUserDrawer: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer
      destroyOnClose
      title={'更新用户'}
      width={520}
      onClose={() => onCancel?.()}
      open={visible}
    >
      <ProTable
        type={'form'}
        rowKey={'id'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.UserUpdateRequest) => {
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
export default UpdateUserDrawer;
