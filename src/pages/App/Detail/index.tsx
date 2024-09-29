import React, { useEffect, useState } from 'react';
import { Button, Col, Grid, Image, message, Row, Space, Typography } from 'antd';
import { getAppVoByIdUsingGet } from '@/services/stephen-backend/appController';
import { useParams } from '@@/exports';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;
const AppDetail: React.FC = () => {
  // 获取路由参数中的id
  const { id } = useParams<{ id: string }>();
  // 是否处于加载状态
  const [loading, setLoading] = useState<boolean>(false);
  const [appData, setAppData] = useState<API.AppVO>({});

  const screens = useBreakpoint();
  const isMobile = !screens.md; // 576px 以下为移动端

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
        split={isMobile ? 'horizontal' : 'vertical'}
        bordered={false}
      >
        <ProCard bordered={false}>
          <Row align={'top'} gutter={[16, 16]}>
            <Col xs={24} md={12} lg={12} xl={12}>
              <ProCard bordered={false}>
                <Typography.Title level={2}>{appData.appName}</Typography.Title>
                <Typography.Paragraph>{appData.appDesc}</Typography.Paragraph>
                <Typography.Paragraph>
                  应用类型:{' '}
                  {appData?.appType !== undefined
                    ? appTypeEnum[appData.appType as AppType]?.text
                    : '未知'}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  评分策略:{' '}
                  {appData?.scoringStrategy !== undefined
                    ? scoringStrategyEnum[appData.scoringStrategy as ScoringStrategy]?.text
                    : '未知'}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  作者: <UserAvatarCard user={appData?.userVO || {}} />
                </Typography.Paragraph>
                <Typography.Paragraph>
                  创建时间:  {dayjs(appData.createTime).format("YYYY-MM-DD HH:mm:ss")}
                </Typography.Paragraph>
                <Space wrap>
                  <Button type="primary">开始答题</Button>
                  <Button>分享应用</Button>
                </Space>
              </ProCard>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Image preview={false} style={{ maxHeight: 360 }} src={appData.appIcon} />
            </Col>
          </Row>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AppDetail;
