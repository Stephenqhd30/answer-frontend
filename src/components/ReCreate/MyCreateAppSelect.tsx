import { ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { listMyAppVoByPageUsingPost } from '@/services/answer-backend/appController';
import { message } from 'antd';

interface Props {
  name: string;
  initialValue?: string;
  label?: string;
}

/**
 * 应用选择器
 * @param props
 * @constructor
 */
const MyCreateAppSelect: React.FC<Props> = (props) => {
  const { name, label = '', initialValue = '' } = props;
  const [value, setValue] = useState<string>(initialValue);
  const [myCreateAppList, setMyCreateAppList] = useState<API.AppVO[]>([]);

  const loadData = async () => {
    try {
      const res = await listMyAppVoByPageUsingPost({
        current: 1,
        pageSize: 50,
        sortField: 'createTime',
        sortOrder: 'descend',
      });
      if (res.code === 0 && res?.data?.records) {
        setMyCreateAppList(res.data.records);
      } else {
        setMyCreateAppList([]);
      }
    } catch (error: any) {
      message.error('获取应用列表失败');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProFormSelect
      name={name}
      label={label}
      options={myCreateAppList.map((item) => ({
        label: item.appName,
        value: item.id,
      }))}
      placeholder="请选择应用"
      allowClear
      showSearch
      fieldProps={{
        value: value,
        onChange: (newValue) => {
          setValue(newValue);
        },
      }}
    />
  );
};

export default MyCreateAppSelect;
