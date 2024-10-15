import { Avatar, message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateMyUserUsingPost } from '@/services/answer-backend/userController';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea, ProFormUploadButton
} from '@ant-design/pro-components';
import { AntDesignOutlined } from '@ant-design/icons';
import { uploadFileUsingPost } from '@/services/answer-backend/fileController';

interface BaseViewProps {
  user: API.User;
}

const BaseView: React.FC<BaseViewProps> = (props) => {
  const { user } = props;
  const [userAvatar, setUserAvatar] = useState<string>();
  /**
   * 更新用户信息
   * @param values
   */
  const handleUpdate = async (values: API.UserUpdateRequest) => {
    const hide = message.loading('正在更新');
    console.log(values);
    try {
      await updateMyUserUsingPost({
        ...values,
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
  const updateProps: UploadProps = {
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
            file: file,
          },
          file,
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
    },
  };

  return (
    <ProCard title="更新个人基本信息" extra={new Date().toLocaleDateString()} headerBordered>
      <ProCard>
        <ProForm
          layout="vertical"
          onFinish={async (values) => {
            await handleUpdate(values);
          }}
          submitter={{
            searchConfig: {
              submitText: '更新用户信息',
            },
            render: (_, dom) => dom[1],
          }}
          initialValues={user}
        >
          <ProFormText name="userName" label="用户名" />
          <ProFormText name="userPhone" label="电话" />
          <ProFormText name="userEmail" label="邮箱" />
          <ProFormTextArea name="userProfile" label="简介" />
          <Avatar
            size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 100, xxl: 120 }}
            icon={<AntDesignOutlined />}
            src={user?.userAvatar}
          />
          <ProFormUploadButton
            title={'上传头像'}
            max={1}
            fieldProps={{
              ...updateProps,
            }}
            name="pic"
          />
        </ProForm>
      </ProCard>
    </ProCard>
  );
};
export default BaseView;
