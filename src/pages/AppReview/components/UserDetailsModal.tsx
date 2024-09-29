import React from 'react';
import { Modal } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { UserDetailsCard } from '@/pages/Account/Center/components';

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  visible: boolean;
  userInfo: API.User;
}

const UserDetailsModal: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, visible, userInfo } = props;

  return (
    <Modal
      destroyOnClose
      title={'创建用户信息'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProCard onSubmit={() => onSubmit?.()}>
        <UserDetailsCard user={userInfo} />
      </ProCard>
    </Modal>
  );
};

export default UserDetailsModal;
