import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import { addScoringResultUsingPost } from '@/services/stephen-backend/scoringResultController';

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
const CreateScoringResultDrawer: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Drawer
      destroyOnClose
      title={'创建评分结果'}
      open={visible}
      width={520}
      onClose={() => {
        onCancel?.();
      }}
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
    </Drawer>
  );
};
export default CreateScoringResultDrawer;
