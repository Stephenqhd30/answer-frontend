import { useModel } from '@umijs/max';

import { Avatar, message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateUserUsingPost } from '@/services/stephen-backend/userController';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-components';
import { AntDesignOutlined } from '@ant-design/icons';
import { uploadFileUsingPost } from '@/services/stephen-backend/fileController';

const BaseView: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [userAvatar, setUserAvatar] = useState<string>();
  /**
   * 更新用户信息
   * @param values
   */
  const handleUpdate = async (values: API.UserUpdateRequest) => {
    const hide = message.loading('正在更新');
    console.log(values);
    try {
      await updateUserUsingPost({
        ...values,
        id: currentUser?.id,
        userAvatar: userAvatar,
      });
      hide();
      message.success('更新成功');
      return true;
    } catch (error: any) {
      hide();
      message.error(`更新失败${error.message}, 请重试!`);
      return false;
    }
  };

  /**
   * 用户更新头像
   */
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFileUsingPost(
          {
            biz: 'user_avatar',
          },
          {
            file: file
          },
          file
        );
        onSuccess(res.data);
        setUserAvatar(res.data);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setUserAvatar(undefined);
    }
  };

  return (
    <ProCard title="更新个人基本信息" extra={new Date().toLocaleDateString()} headerBordered>
      <ProCard title="用户基本信息" colSpan="50%">
        <ProForm
          layout="vertical"
          onFinish={async (values) => {
            await handleUpdate(values);
          }}
          submitter={{
            searchConfig: {
              submitText: '更新基本信息',
            },
            render: (_, dom) => dom[1],
          }}
          initialValues={{
            ...currentUser,
          }}
        >
          <ProFormText width={'md'} colProps={{ md: 12, xl: 8 }} name="userName" label="用户名" />
          <ProFormText width={'md'} colProps={{ md: 12, xl: 8 }} name="userPhone" label="电话" />
          <ProFormText width={'md'} colProps={{ md: 12, xl: 8 }} name="userEmail" label="邮箱" />
          <ProFormTextArea
            width={'md'}
            colProps={{ md: 12, xl: 8 }}
            name="userProfile"
            label="简介"
          />
        </ProForm>
      </ProCard>
      <ProCard title="更新用户头像">
        <div>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 120 }}
            icon={<AntDesignOutlined />}
            src={currentUser?.userAvatar}
          />
        </div>
        <ProFormUploadButton
          title={'上传头像'}
          max={1}
          fieldProps={{
            ...props
          }}
          name="pic"
        />
      </ProCard>
    </ProCard>
  );
};
export default BaseView;
