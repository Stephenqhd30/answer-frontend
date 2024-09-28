import { message, Modal } from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { doAppReviewUsingPost } from '@/services/stephen-backend/appController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.App>[];
  certificate: API.App;
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, certificate, onSubmit, columns } = props;
  return (
    <Modal destroyOnClose title={'审核信息'} onCancel={() => onCancel?.()} open={visible} footer>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values: API.ReviewRequest) => {
          try {
            const success = await doAppReviewUsingPost({
              ...values,
              id: certificate.id,
            });
            if (success) {
              onSubmit?.(values);
              message.success('审核信息已更新');
            }
          } catch (error: any) {
            message.error('审核失败' + error.message);
          }
        }}
      />
    </Modal>
  );
};

export default ReviewModal;
