import React from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Grid, message, Steps } from 'antd';
import { addAppUsingPost } from '@/services/stephen-backend/appController';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { scoringStrategyEnum } from '@/enum/ScoringStrategy';

const { useBreakpoint } = Grid;
const { Step } = Steps;

/**
 * 修改应用信息
 * @constructor
 */
const AddApp: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.sm;
  /**
   * 获取原始应用
   */
  const handleAdd = async (values: API.AppAddRequest) => {
    console.log(values);
    try {
      const res = await addAppUsingPost({
        ...values,
      });
      if (res.code === 0 && res.data) {
        message.success('创建应用信息成功');
      } else {
        message.error('创建应用信息失败');
      }
    } catch (error: any) {
      message.error(`创建应用信息失败${error.message}` + '请重试!');
    }
  };
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <ProCard split={isMobile ? 'horizontal' : 'vertical'} bordered>
        <ProCard colSpan={isMobile ? 24 : 6}>
          <Steps
            direction={isMobile ? 'horizontal' : 'vertical'}
            labelPlacement="vertical"
            items={[
              { title: '应用名称', description: '填写应用名称' },
              { title: '应用描述', description: '填写应用描述' },
              { title: '应用类型', description: '填写应用类型' },
              { title: '评分策略', description: '填写评分策略' },
              { title: '完成创建', description: '您的应用准备就绪~' },
            ]}
          />
        </ProCard>
        <ProCard
          colSpan={isMobile ? 24 : 18}
          title={'创建应用'}
          extra={new Date().toLocaleDateString()}
        >
          <ProForm
            layout={'horizontal'}
            style={{ maxWidth: 480 }}
            onFinish={async (values: API.AppAddRequest) => {
              await handleAdd(values);
            }}
            initialValues={{}}
          >
            <ProFormText
              name="appName"
              label="应用名称"
              placeholder="请输入应用名称"
              rules={[{ required: true, message: '应用名称不能为空' }]}
            />

            <ProFormTextArea
              name="appDesc"
              label="应用描述"
              placeholder="请输入应用描述"
              rules={[{ required: true, message: '应用描述不能为空' }]}
            />

            <ProFormSelect
              name="appType"
              label="应用类型"
              placeholder="请选择应用类型"
              valueEnum={appTypeEnum}
              rules={[{ required: true, message: '应用类型不能为空' }]}
            />
            <ProFormSelect
              name="scoringStrategy"
              label="评分策略"
              placeholder="请选择评分策略"
              valueEnum={scoringStrategyEnum}
              rules={[{ required: true, message: '评分策略不能为空' }]}
            />
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AddApp;
