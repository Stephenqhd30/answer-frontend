import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
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
const UpdateAppDrawer: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer
      destroyOnClose
      title={'更新应用信息'}
      open={visible}
      width={520}
      onClose={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        form={{
          initialValues: oldData,
        }}
        rowKey={'id'}
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
    </Drawer>
  );
};
export default UpdateAppDrawer;
