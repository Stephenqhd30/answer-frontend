import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Space, Tag, Typography } from 'antd';
import { getUserByIdUsingGet } from '@/services/stephen-backend/userController';
import { appTypeEnum } from '@/enum/AppTypeEnum';
import { ReviewStatus, reviewStatusEnum } from '@/enum/ReviewStatusEnum';
import { listAppByPageUsingPost } from '@/services/stephen-backend/appController';
import { scoringStrategyEnum } from '@/enum/ScoringStrategy';
import { ReviewModal, UserDetailsModal } from '@/pages/AppReview/components';

const AppReview: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 创建用户信息 Modal 框
  const [userDetailsModal, setUserDetailsModal] = useState<boolean>(false);
  // 审核信息 Modal 框
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.App>({});
  // 获得者用户信息
  const [userInfo, setUserInfo] = useState<API.User>({});
  /**
   * 获得者用户信息
   * @param userId 获得者用户id
   */
  const getCurrentUserInfo = async (userId: any) => {
    try {
      const res = await getUserByIdUsingGet({ id: userId });
      if (res.code === 0 && res.data) {
        setUserInfo(res.data);
      }
    } catch (error: any) {
      message.error('获取用户数据失败' + error.message);
    }
  };
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
      hideInForm: true,
    },
    {
      title: '应用描述',
      dataIndex: 'appDesc',
      valueType: 'textarea',
      hideInForm: true,
    },
    {
      title: '应用图标',
      dataIndex: 'appIcon',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '应用类型',
      dataIndex: 'appType',
      valueEnum: appTypeEnum,
      hideInForm: true,
    },
    {
      title: '评分策略',
      dataIndex: 'scoringStrategy',
      valueEnum: scoringStrategyEnum,
      hideInForm: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: reviewStatusEnum,
      render: (_, record) => {
        // @ts-ignore
        const status = reviewStatusEnum[record.reviewStatus];
        return (
          <Tag bordered={false} color={status.color}>
            {status.text}
          </Tag>
        );
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'textarea',
    },
    {
      title: '审核人Id',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '审核时间',
      sorter: true,
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
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
            key={'user-details'}
            onClick={async () => {
              setUserDetailsModal(true);
              await getCurrentUserInfo(record?.userId);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'review'}
            onClick={async () => {
              setReviewModal(true);
              setCurrentRow(record);
            }}
          >
            审核信息
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.App, API.PageParams>
        headerTitle={'证书审核'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listAppByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            notId: ReviewStatus.PASS,
          } as API.AppQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      {/*查看获得者信息*/}
      {userDetailsModal && (
        <UserDetailsModal
          onCancel={() => setUserDetailsModal(false)}
          onSubmit={async () => {
            setUserDetailsModal(false);
            actionRef.current?.reload();
          }}
          userInfo={userInfo}
          visible={userDetailsModal}
        />
      )}
      {/*审核*/}
      {reviewModal && (
        <ReviewModal
          visible={reviewModal}
          onCancel={() => setReviewModal(false)}
          certificate={currentRow ?? {}}
          columns={columns}
          onSubmit={async () => {
            setReviewModal(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};

export default AppReview;
