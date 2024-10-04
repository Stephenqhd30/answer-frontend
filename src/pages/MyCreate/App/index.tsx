import React, { useState } from 'react';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { listMyAppVoByPageUsingPost } from '@/services/stephen-backend/appController';
import { AppCard } from '@/components';


/**
 * 我创建的应用
 * @constructor
 */
const MyCreateApp: React.FC = () => {
  // 数据列表
  const [dataList, setDataList] = useState<API.AppVO[]>([]);

  return (
    <PageContainer>
      <ProList<API.AppVO, API.PageParams>
        itemLayout="vertical"
        rowKey="id"
        grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
        headerTitle="应用列表"
        pagination={{
          pageSize: 12,
          showQuickJumper: true,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listMyAppVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.AppQueryRequest);
          setDataList(data?.records || ([] as API.AppVO[]));
          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        dataSource={dataList}
        renderItem={(item) => <AppCard key={item.id} app={item} />}
      />
    </PageContainer>
  );
};

export default MyCreateApp;
