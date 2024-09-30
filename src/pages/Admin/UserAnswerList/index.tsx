import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm, Select, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteUserAnswerUsingPost,
  listUserAnswerByPageUsingPost,
} from '@/services/stephen-backend/userAnswerController';
import {
  CreateUserAnswerModal,
  UpdateUserAnswerModal,
} from '@/pages/Admin/UserAnswerList/components';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteUserAnswerUsingPost({
      id: row.id,
    });
    hide();
    message.success('删除成功');
  } catch (error: any) {
    hide();
    message.error(`删除失败${error.message}, 请重试!`);
  }
};

/**
 * 用户管理列表
 * @constructor
 */
const UserAnswerList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserAnswer>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.UserAnswer>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建人Id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '应用Id',
      dataIndex: 'appId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '结果Id',
      dataIndex: 'resultId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '结果名称',
      dataIndex: 'resultName',
      valueType: 'text',
    },
    {
      title: '结果描述',
      dataIndex: 'resultDesc',
      valueType: 'textarea',
    },
    {
      title: '结果选择',
      dataIndex: 'choices',
      valueType: 'textarea',
    },
    {
      title: '结果分数',
      dataIndex: 'resultScore',
      valueType: 'text',
    },
    {
      title: '应用类型',
      dataIndex: 'appType',
      valueEnum: appTypeEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={AppType.SCORE}>{appTypeEnum[AppType.SCORE].text}</Select.Option>
            <Select.Option value={AppType.TEXT}>{appTypeEnum[AppType.TEXT].text}</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '结果图片',
      dataIndex: 'resultPicture',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '评分策略',
      dataIndex: 'scoringStrategy',
      valueEnum: scoringStrategyEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={ScoringStrategy.CUSTOM}>
              {scoringStrategyEnum[ScoringStrategy.CUSTOM].text}
            </Select.Option>
            <Select.Option value={ScoringStrategy.AI}>
              {scoringStrategyEnum[ScoringStrategy.AI].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="update"
            onClick={() => {
              setUpdateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            修改
          </Typography.Link>
          {/*删除表单用户的PopConfirm框*/}
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复?"
            okText="确定"
            cancelText="取消"
            onConfirm={async () => {
              await handleDelete(record);
              actionRef.current?.reload();
            }}
          >
            <Typography.Link
              key={'delete'}
              type={'danger'}
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.UserAnswer, API.PageParams>
        headerTitle={'用户回答表格'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listUserAnswerByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserAnswerQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />

      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreateUserAnswerModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
          visible={createModalVisible}
          columns={columns}
        />
      )}
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdateUserAnswerModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateModalVisible}
          columns={columns}
          oldData={currentRow}
        />
      )}
    </>
  );
};
export default UserAnswerList;
