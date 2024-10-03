import React, { useEffect, useMemo, useState } from 'react';
import { Col, Grid, Image, message, Row } from 'antd';
import { getAppVoByIdUsingGet } from '@/services/stephen-backend/appController';
import { useModel, useParams } from '@@/exports';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import {AppDetailsCard} from '@/pages/App/components';

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
        title={appData.appName}
        loading={loading}
        extra={new Date().toLocaleDateString()}
        split={isMobile ? 'horizontal' : 'vertical'}
        bordered={false}
      >
        <ProCard bordered={false}>
          <Row align={'top'} gutter={[16, 16]}>
            <Col xs={24} md={14} lg={14} xl={14}>
              <AppDetailsCard appData={appData} isCreator={isCreator} isCreate={true} />
            </Col>
            <Col xs={24} md={10} lg={10} xl={10}>
              <Image preview={false} style={{ maxHeight: 360 }} src={appData.appIcon} />
            </Col>
          </Row>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AppDetail;
