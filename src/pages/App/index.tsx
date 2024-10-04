import React, { useEffect, useMemo, useState } from 'react';
import { Col, Grid, Image, message, Row, Typography } from 'antd';
import { getAppVoByIdUsingGet } from '@/services/stephen-backend/appController';
import { useModel, useParams } from '@@/exports';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { AppDetailsCard } from '@/pages/App/components';

const { useBreakpoint } = Grid;
const AppDetail: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  // 获取路由参数中的id
  const { id } = useParams<{ id: string }>();
  // 是否处于加载状态
  const [loading, setLoading] = useState<boolean>(false);
  const [appData, setAppData] = useState<API.AppVO>({});

  const screens = useBreakpoint();
  const isMobile = !screens.md; // 576px 以下为移动端

  // 是不是本人创建的
  const isCreator = useMemo(() => {
    return appData?.userId === currentUser?.id;
  }, [appData?.userId]);
  /**
   * 加载数据
   */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAppVoByIdUsingGet({
        id: id as any,
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
    <PageContainer>
      <ProCard
        title={<Typography.Title level={4}>{appData.appName}</Typography.Title>}
        loading={loading}
        extra={isMobile ? '' : new Date().toLocaleDateString()}
        split={isMobile ? 'horizontal' : 'vertical'}
        bordered={false}
      >
        <Row align={'top'} gutter={24}>
          <Col xs={24} md={16} lg={16} xl={16}>
            <AppDetailsCard appData={appData} isCreator={isCreator} />
          </Col>
          <Col xs={24} md={8} lg={8} xl={8}>
            <Image preview={false} style={{ maxHeight: 320 }} src={appData.appIcon} />
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
};

export default AppDetail;
