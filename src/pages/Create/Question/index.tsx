import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Grid, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  addQuestionUsingPost,
  listQuestionVoByPageUsingPost,
} from '@/services/answer-backend/questionController';
import { CreateStepsCard, MyCreateAppSelect } from '@/components';
import { useParams } from '@@/exports';

const { useBreakpoint } = Grid;

/**
 * 添加题目页
 * @constructor
 */
const CreateQuestionPage: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const { appId } = useParams();
  // 加载
  const [loading, setLoading] = useState<boolean>(false);
  const [oldQuestion, setOldQuestion] = useState<API.QuestionVO>({});
  // Steps表单
  const items = [
    { title: '应用id', description: '确认应用id' },
    { title: '题目列表', description: '添加题目列表' },
    { title: '题目选项', description: '设置题目选项' },
    { title: '完成创建', description: '您的题目准备就绪~' },
  ];

  const loadData = async () => {
    try {
      const res = await listQuestionVoByPageUsingPost({
        appId: appId as any,
        current: 1,
        pageSize: 1,
        sortField: 'createTime',
        sortOrder: 'descend',
      });
      if (res.code === 0 && res?.data?.records) {
        setOldQuestion(res?.data?.records[0]);
      } else {
        setOldQuestion({});
      }
    } catch (error: any) {
      message.error(`加载失败${error.message}`);
    }
  };


  useEffect(() => {
    if (appId && appId !== ':appId') {
      loadData();
    }
  }, []);

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
            initialValues={{
              appId: appId,
              questionContent: oldQuestion?.questionContent || [],
            }}
          >
            <MyCreateAppSelect name={'appId'} label="应用" initialValue={appId === ':appId'? '请选择应用' : appId}/>
            {/* 题目列表 */}
            <ProFormList
              name="questionContent"
              label="问题列表"
              creatorButtonProps={{
                position: 'bottom',
                creatorButtonText: '添加题目',
              }}
              initialValue={oldQuestion?.questionContent || []}
              itemRender={({ listDom, action }, { index }) => (
                <ProCard
                  bordered
                  gutter={16}
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
              <ProFormList
                name="questionOptionList"
                label="题目选项"
                creatorButtonProps={{
                  position: 'bottom',
                  creatorButtonText: '添加选项'
                }}
                initialValue={[]}
                itemRender={({listDom, action}, {index}) => (
                  <ProCard title={`选项 ${index + 1}`} extra={action} collapsible>
                    {listDom}
                    <ProFormText name="key" label="选项Key"/>
                    <ProFormText name="value" label="选项值"/>
                  </ProCard>
                )}
              />
            </ProFormList>
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default CreateQuestionPage;
