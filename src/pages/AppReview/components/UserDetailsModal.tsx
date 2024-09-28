import React from 'react';
import { Modal } from 'antd';
import {ProCard, ProTable} from '@ant-design/pro-components';

interface Props {
  onCancel: () => void;
  onSubmit: (values: API.AppUpdateRequest) => Promise<void>;
  visible: boolean;
  userInfo: API.User;
}

const UserDetailsModal: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, visible, userInfo } = props;

  return (
    <Modal
      destroyOnClose
      title={'创建用户详情'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProCard>

      </ProCard>
    </Modal>
  );
};

export default UserDetailsModal;
