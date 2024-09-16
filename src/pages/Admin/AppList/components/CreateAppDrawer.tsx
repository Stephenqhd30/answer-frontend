import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import { addAppUsingPost } from '@/services/stephen-backend/appController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.AppAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.App>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.AppAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addAppUsingPost({
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
const CreateAppDrawer: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Drawer
      destroyOnClose
      title={'创建应用'}
      open={visible}
      width={520}
      onClose={() => {
        onCancel?.();
      }}
    >
      <ProTable
        columns={columns}
        rowKey={'id'}
        onSubmit={async (values: API.AppAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Drawer>
  );
};
export default CreateAppDrawer;
