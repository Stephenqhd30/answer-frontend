import {EditableProTable, PageContainer, ProCard, ProColumns, ProForm, ProFormText} from '@ant-design/pro-components';
import {Grid, message} from 'antd';
import React, {useState} from 'react';
import {addQuestionUsingPost} from '@/services/stephen-backend/questionController';
import {CreateStepsCard} from '@/components';

const {useBreakpoint} = Grid;

const AddQuestionPage: React.FC = () => {
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [questionContentEditableKeys, setQuestionContentEditableKeys] = useState<React.Key[]>([]);
  const items = [
    { title: '应用名称', description: '填写应用名称' },
    { title: '应用描述', description: '填写应用描述' },
    { title: '应用图标', description: '上传应用图标' },
    { title: '应用类型', description: '填写应用类型' },
    { title: '评分策略', description: '填写评分策略' },
    { title: '完成创建', description: '您的应用准备就绪~' },
  ]

  /**
   * 可编辑表格的列：QuestionOption
   */
  const questionOptionColumns: ProColumns<API.QuestionOption>[] = [
    {
      title: "正确选项",
      dataIndex: "key",
    },
    {
      title: "结果",
      dataIndex: "result",
    },
    {
      title: "得分",
      dataIndex: "score",
      valueType: 'digit',
    },
    {
      title: "选择结果",
      dataIndex: "value",
    },
  ];

  /**
   * 可编辑表格的列：QuestionContentDTO
   */
  const questionContentColumns: ProColumns<API.QuestionContentDTO>[] = [
    {
      title: '题目标题',
      dataIndex: 'title',
      formItemProps: {
        rules: [{ required: true, message: '请输入题目标题' }],
      },
    },
    {
      title: 'Options',
      dataIndex: 'questionOptionList',
      renderFormItem: (_, { record }) => {
        return (
          <EditableProTable<API.QuestionOption>
            rowKey="key"
            toolBarRender={false}
            columns={questionOptionColumns}
            value={record?.questionOptionList}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProCard split={isMobile ? 'horizontal' : 'vertical'} bordered>
        <CreateStepsCard isMobile={isMobile} span={6} items={items}/>
        <ProCard
          colSpan={isMobile ? 24 : 18}
          title={'创建问题'}
          extra={new Date().toLocaleDateString()}
        >
          <ProForm<API.QuestionAddRequest>
            grid
            onFinish={async (values) => {
              const res = await addQuestionUsingPost(values);
              if (res.code === 0 && res.data) {
                message.success('提交成功');
              } else {
                message.error('提交失败');
              }
            }}
          >
            <ProFormText
              name="appId"
              label="应用ID"
              placeholder="请输入应用ID"
            />
            <ProForm.Item
              label="问题列表"
              name="questionContent"
              trigger="onValuesChange"
            >
              <EditableProTable<API.QuestionContentDTO>
                rowKey="title"
                toolBarRender={false}
                columns={questionContentColumns}
                recordCreatorProps={{
                  newRecordType: 'dataSource',
                  position: 'top',
                  record: () => ({
                    title: '新问题',
                    questionOptionList: [],
                  }),
                }}
                editable={{
                  type: 'multiple',
                  editableKeys: questionContentEditableKeys,
                  onChange: setQuestionContentEditableKeys,
                }}
              />
            </ProForm.Item>
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default AddQuestionPage;
