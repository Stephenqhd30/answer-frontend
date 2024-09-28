import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { listAppVoByPageUsingPost } from '@/services/stephen-backend/appController';
import { AppCard } from '@/pages/Home/components';

// 定义初始化搜索条件
const initSearchParams: API.AppQueryRequest = {
  current: 1,
  pageSize: 10,
};

const HomePage: React.FC = () => {
  // 加载搜索栏
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  // 数据列表
  const [dataList, setDataList] = useState<API.AppVO[]>([]);

  const onSearch = (value: string) => {
    setSearchLoading(true);
    console.log(value);
  };

  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <Search
        style={{ maxWidth: 1200, margin: '0 auto 16px' }}
        placeholder="快速发现答题应用"
        allowClear
        loading={searchLoading}
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <ProList<API.AppVO, API.PageParams>
        itemLayout="vertical"
        rowKey="id"
        grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
        headerTitle="应用列表"
        pagination={initSearchParams}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listAppVoByPageUsingPost({
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

export default HomePage;
