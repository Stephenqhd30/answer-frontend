import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

import { ACCOUNT_TITLE } from '@/constants';
import BaseView from '@/pages/Account/Settings/components/BaseView';
import SecurityView from '@/pages/Account/Settings/components/SecurityView';
import BindingView from '@/pages/Account/Settings/components/BindingView';
import styles from './index.less';
import { Grid } from 'antd';
import {useModel} from '@@/exports';

const { useBreakpoint } = Grid;

const Settings: React.FC = () => {

  const { initialState } = useModel("@@initialState");
  const currentUser = initialState?.currentUser || {};
  const [activeKeyTab, setActiveKeyTab] = useState<string>(() => {
    return localStorage.getItem('activeKeyTab') || 'base';
  });

  useEffect(() => {
    localStorage.setItem('activeKeyTab', activeKeyTab);
  }, [activeKeyTab]);

  const screens = useBreakpoint();
  const isMobile = !screens.md; // 576px 以下为移动端

  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <ProCard
        className={styles.proCard}
        tabs={{
          tabPosition: isMobile ? 'top' : 'left',
          activeKey: activeKeyTab,
          items: [
            {
              label: `基本设置`,
              key: 'base',
              children: <BaseView user={currentUser}/>,
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
    </PageContainer>
  );
};

export default Settings;
