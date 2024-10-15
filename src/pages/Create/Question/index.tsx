import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Grid, message, Typography } from 'antd';
import React, { useState } from 'react';
import { addQuestionUsingPost } from '@/services/answer-backend/questionController';
import { CreateStepsCard } from '@/components';

const { useBreakpoint } = Grid;

/**
 * 添加题目页
 * @constructor
 */
const CreateQuestionPage: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const [loading, setLoading] = useState<boolean>(false);
  const items = [
    { title: '应用id', description: '确认应用id' },
    { title: '题目列表', description: '添加题目列表' },
    { title: '题目选项', description: '设置题目选项' },
    { title: '完成创建', description: '您的题目准备就绪~' },
  ];

  return (
    <PageContainer>
      <ProCard split={isMobile ? 'horizontal' : 'vertical'} bordered>
        <CreateStepsCard isMobile={isMobile} span={6} items={items} />
        <ProCard
          gutter={[16, 16]}
          colSpan={isMobile ? 24 : 18}
          title={<Typography.Title level={3}>创建题目</Typography.Title>}
          extra={isMobile ? '' : new Date().toLocaleDateString()}
        >
          <ProForm<API.QuestionAddRequest>
            submitter={{
              submitButtonProps: {
                loading: loading,
              },
            }}
            layout={'horizontal'}
            onFinish={async (values) => {
              setLoading(true);
              try {
                const res = await addQuestionUsingPost(values);
                if (res.code === 0 && res.data) {
                  message.success('提交成功');
                } else {
                  message.error('提交失败');
                }
              } catch (error: any) {
                message.error(`提交失败${error.message}`);
              } finally {
                setLoading(false);
              }
            }}
          >
            <ProFormText name="appId" label="应用id" placeholder="请选择您的应用" />
            {/* 题目列表 */}
            <ProFormList
              name="questionContent"
              label="问题列表"
              creatorButtonProps={{ position: 'bottom' }}
              itemRender={({ listDom, action }, { index }) => (
                <ProCard
                  bordered
                  title={`题目 ${index + 1}`}
                  extra={action}
                  collapsible
                >
                  {listDom}
                </ProCard>
              )}
            >
              {/* 题目标题 */}
              <ProFormText name="title" label="题目标题" />
              {/* 题目选项 */}
              <ProFormList max={1} name="questionOptionList" label="题目选项">
                <ProFormText name="key" label="选项Key" />
                <ProFormText name="result" label="选项结果" />
                <ProFormText name="score" label="选项得分" />
                <ProFormText name="value" label="选项值" />
              </ProFormList>
            </ProFormList>
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default CreateQuestionPage;
