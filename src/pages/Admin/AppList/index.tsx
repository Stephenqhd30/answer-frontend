import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateAppDrawer from './components/UpdateAppDrawer';
import {
  deleteAppUsingPost,
  listAppByPageUsingPost,
} from '@/services/stephen-backend/appController';
import CreateAppDrawer from '@/pages/Admin/AppList/components/CreateAppDrawer';
import { reviewStatusEnum } from '@/enum/ReviewStatusEnum';
import { appTypeEnum } from '@/enum/AppTypeEnum';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteAppUsingPost({
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
const UserList: React.FC = () => {
  // 新建窗口的Drawer框
  const [createDrawerVisible, setCreateDrawerVisible] = useState<boolean>(false);
  // 更新窗口的Drawer框
  const [updateDrawerVisible, setUpdateDrawerVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.App>();

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.App>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建用户Id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '应用名',
      dataIndex: 'appName',
      valueType: 'text',
    },
    {
      title: '应用描述',
      dataIndex: 'appDesc',
      valueType: 'textarea',
    },
    {
      title: '应用图标',
      dataIndex: 'appIcon',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '应用类型',
      dataIndex: 'appType',
      valueEnum: appTypeEnum,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      hideInForm: true,
      valueEnum: reviewStatusEnum,
      render: (_, record) => {
        // @ts-ignore
        const status = reviewStatusEnum[record.reviewStatus];
        return (
          <Tag bordered={false} color={status.color}>
            {status.text}
          </Tag>
        );
      }
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'text',
      hideInForm: true
    },
    {
      title: '审核人Id',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '评分策略',
      dataIndex: 'scoringStrategy',
      valueEnum: {
        0: {
          text: '自定义评分',
        },
        1: {
          text: 'AI评分',
        },
      },
    },
    {
      title: '审核时间',
      sorter: true,
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      hideInSearch: true,
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
      <ProTable<API.App, API.PageParams>
        headerTitle={'应用表格'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={"toolBar"}>
            <Button
              type="primary"
              key="reviewing"
              onClick={() => {
                setCreateDrawerVisible(true);
              }}
            >
              <EditOutlined/> 审核信息
            </Button>
            <Button
              type="primary"
              key="create"
              onClick={() => {
                setCreateDrawerVisible(true);
              }}
            >
              <PlusOutlined/> 新建
            </Button>
          </Space>
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listAppByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.AppQueryRequest);

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
        <CreateAppDrawer
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
        <UpdateAppDrawer
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
export default UserList;
