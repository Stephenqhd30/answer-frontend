import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateScoringResultDrawer from './components/UpdateScoringResultDrawer';
import {
  deleteScoringResultUsingPost,
  listScoringResultByPageUsingPost,
} from '@/services/stephen-backend/scoringResultController';
import CreateScoringResultDrawer from '@/pages/Admin/ScoringResultList/components/CreateScoringResultDrawer';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteScoringResultUsingPost({
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
const ScoringResultList: React.FC = () => {
  // 新建窗口的Drawer框
  const [createDrawerVisible, setCreateDrawerVisible] = useState<boolean>(false);
  // 更新窗口的Drawer框
  const [updateDrawerVisible, setUpdateDrawerVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.ScoringResult>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.ScoringResult>[] = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '结果名称',
      dataIndex: 'resultName',
      valueType: 'text',
    },
    {
      title: '结果属性集合',
      dataIndex: 'resultProp',
      valueType: 'text',
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
      title: '结果得分范围',
      dataIndex: 'resultScoreRange',
      valueType: 'text',
    },
    {
      title: '创建人Id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
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
              setUpdateDrawerVisible(true);
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
      <ProTable<API.ScoringResult, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateDrawerVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listScoringResultByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.ScoringResultQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />

      {/*新建表单的Drawer框*/}
      {createDrawerVisible && (
        <CreateScoringResultDrawer
          onCancel={() => {
            setCreateDrawerVisible(false);
          }}
          onSubmit={async () => {
            setCreateDrawerVisible(false);
            actionRef.current?.reload();
          }}
          visible={createDrawerVisible}
          columns={columns}
        />
      )}
      {/*更新表单的Drawer框*/}
      {updateDrawerVisible && (
        <UpdateScoringResultDrawer
          onCancel={() => {
            setUpdateDrawerVisible(false);
          }}
          onSubmit={async () => {
            setUpdateDrawerVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateDrawerVisible}
          columns={columns}
          oldData={currentRow}
        />
      )}
    </>
  );
};
export default ScoringResultList;
