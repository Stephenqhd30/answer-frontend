import React, { useEffect, useState } from 'react';
import {Image, message} from 'antd';
import { getAppVoByIdUsingGet } from '@/services/stephen-backend/appController';
import { useParams } from '@@/exports';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { PageContainer, ProCard } from '@ant-design/pro-components';

const AppDetail: React.FC = () => {
  // 获取路由参数中的id
  const { id } = useParams<{ id: string }>();
  // 是否处于加载状态
  const [loading, setLoading] = useState<boolean>(false);
  const [appData, setAppData] = useState<API.AppVO>({});
  const [responsive, setResponsive] = useState(false);

  /**
   * 加载数据
   */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAppVoByIdUsingGet({
        // @ts-ignore
        id: id,
      });
      if (res.code === 0 && res.data) {
        setAppData(res.data || {});
      }
    } catch (error: any) {
      message.error('获取应用信息失败' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);
  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProCard
        title={appData.appName}
        loading={loading}
        extra={new Date().toLocaleDateString()}
        split={responsive ? 'horizontal' : 'vertical'}
        bordered={false}
      >
        <ProCard colSpan="50%" bordered={false}>
          <UserAvatarCard user={appData?.userVO || {}} />
        </ProCard>
        <ProCard bordered={false} colSpan="50%">
          <Image style={{ height: 360 }} src={appData.appIcon} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AppDetail;
