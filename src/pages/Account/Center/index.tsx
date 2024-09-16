import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { ACCOUNT_TITLE } from '@/constants';
import { Col, Row } from 'antd';
import { useModel } from '@@/exports';
import UserCard from '@/pages/Account/Center/components/UserCard';
import UserDetailsCard from '@/pages/Account/Center/components/UserDetailsCard';

const UserCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  return (
    <PageContainer title={ACCOUNT_TITLE} extra={new Date().toLocaleDateString()}>
      <Row align={'top'} gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6} xl={6}>
          <ProCard bordered={false}>
            <UserCard user={currentUser || {}} />
          </ProCard>
        </Col>
        <Col xs={24} md={16} lg={18} xl={18}>
          <ProCard bordered>
            <UserDetailsCard user={currentUser || {}} />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserCenter;
