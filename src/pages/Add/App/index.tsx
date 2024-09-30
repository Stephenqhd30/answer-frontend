import React, { useState } from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Grid, message, Space, Steps, Typography } from 'antd';
import { addAppUsingPost } from '@/services/stephen-backend/appController';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { scoringStrategyEnum } from '@/enum/ScoringStrategy';

const { useBreakpoint } = Grid;
const form = {} as API.AppAddRequest;

/**
 * 修改应用信息
 * @constructor
 */
const AddApp: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.sm;
  const [current, setCurrent] = useState<number>(0);

  /**
   * 切换步骤
   * @param value
   */
  const onChange = (value: number) => {
    setCurrent(value);
  };
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
      <ProCard split={isMobile ? 'horizontal' : 'vertical'} bordered={false}>
        <ProCard colSpan={isMobile ? 24 : 6}>
          <Steps
            direction={isMobile ? 'horizontal' : 'vertical'}
            current={current}
            onChange={onChange}
            items={[
              { title: '应用名称', description: '请输入应用名称!' },
              { title: '应用描述', description: '请输入应用描述!' },
              { title: '应用类型', description: '请选择应用类型!' },
              { title: '评分策略', description: '请选择评分策略!' },
              { title: '完成创建' },
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
            submitter={{
              searchConfig: {
                submitText: '创建应用',
              },
              render: (_, dom) => {
                return (
                  <Space wrap>

                    {current !== 0 && (
                      <Button key="pre" onClick={() => setCurrent(current - 1)}>
                        上一步
                      </Button>
                    )}
                    {current !== 4 && (
                      <Button key="primary" type="primary" onClick={() => setCurrent(current + 1)}>
                        下一步
                      </Button>
                    )}
                    {dom[0]}
                    {dom[1]}
                  </Space>
                );
              },
            }}
            initialValues={form}
          >
            {current === 0 && (
              <ProFormText name="appName" label="应用名称" placeholder={'请输入应用名称'} />
            )}
            {current === 1 && (
              <ProFormTextArea name="appDesc" label="应用描述" placeholder={'请输入应用描述'} />
            )}
            {current === 2 && (
              <ProFormSelect
                name="appType"
                label="应用类型"
                placeholder={'请选择应用类型'}
                valueEnum={appTypeEnum}
              />
            )}
            {current === 3 && (
              <ProFormSelect
                name="scoringStrategy"
                label="评分策略"
                placeholder={'请选择评分策略'}
                valueEnum={scoringStrategyEnum}
              />
            )}
            {current === 4 && <Typography.Paragraph>应用已经准备就绪~</Typography.Paragraph>}
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AddApp;
