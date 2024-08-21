import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import UserInfoCard from '@/pages/Account/Center/components/UserCard';
import UserDetailsCard from '@/pages/Account/Center/components/UserDetailsCard';
import { ACCOUNT_TITLE } from '@/constants';

const UserCenter: React.FC = () => {
  return (
    <PageContainer title={ACCOUNT_TITLE} extra={new Date().toLocaleDateString()}>
      <ProCard>
        <ProCard headerBordered gutter={16} colSpan={'40%'}>
          <UserInfoCard />
        </ProCard>
        <ProCard title="个人信息详细页" layout={'center'}>
          <UserDetailsCard />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UserCenter;
