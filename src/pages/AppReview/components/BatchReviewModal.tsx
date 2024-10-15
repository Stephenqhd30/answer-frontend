import { message, Modal } from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { doAppReviewByBatchUsingPost } from '@/services/answer-backend/appController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.App>[];
  selectedRowKeys: any[];
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
}

/**
 * 批量审核弹窗
 * @param props
 * @constructor
 */
const BatchReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, selectedRowKeys, onSubmit, columns } = props;
  return (
    <Modal
      destroyOnClose
      title={'批量审核信息'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values: API.ReviewRequest) => {
          try {
            const success = await doAppReviewByBatchUsingPost({
              ...values,
              idList: JSON.stringify(selectedRowKeys),
            });
            if (success) {
              onSubmit?.(values);
              message.success('审核信息已更新');
              onCancel?.();
            }
          } catch (error: any) {
            message.error('审核失败' + error.message);
          }
        }}
      />
    </Modal>
  );
};

export default BatchReviewModal;
