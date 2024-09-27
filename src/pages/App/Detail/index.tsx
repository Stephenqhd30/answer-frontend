import React, { useEffect, useState } from 'react';
import { Card, Col, message, Row } from 'antd';
import { getAppVoByIdUsingGet } from '@/services/stephen-backend/appController';
import { useParams } from '@@/exports';
import UserAvatarCard from '@/components/ReUser/UserAvatarCard';

const AppDetail: React.FC = () => {
  // 获取路由参数中的id
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [appData, setAppData] = useState<API.AppVO>({});

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
    <Card>
      <Row style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <h2>{appData.appName}</h2>
          <p>{appData.appDesc}</p>
          <div>
            作者：
            <UserAvatarCard key={appData.userId} user={appData.userVO as API.User} />
          </div>
        </Col>

      </Row>
    </Card>
  );
};

export default AppDetail;
