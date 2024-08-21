import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';

import { ACCOUNT_TITLE } from '@/constants';
import BaseView from '@/pages/Account/Settings/components/BaseView';
import SecurityView from '@/pages/Account/Settings/components/SecurityView';
import BindingView from '@/pages/Account/Settings/components/BindingView';

const Settings: React.FC = () => {
  const [activeKeyTab, setActiveKeyTab] = useState('base');
  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <div>
        <ProCard
          tabs={{
            tabPosition: 'left',
            activeKey: activeKeyTab,
            items: [
              {
                label: `基本设置`,
                key: 'base',
                children: <BaseView />,
              },
              {
                label: `账号绑定`,
                key: 'binding',
                children: <BindingView />,
              },
              {
                label: `安全设置`,
                key: 'security',
                children: <SecurityView />,
              },
            ],
            onChange: (activeKey) => {
              setActiveKeyTab(activeKey);
            },
          }}
        />
      </div>
    </PageContainer>
  );
};
export default Settings;
