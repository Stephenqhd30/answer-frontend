import { Avatar, Col, message, Row, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateUserUsingPost } from '@/services/stephen-backend/userController';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea, ProFormUploadButton
} from '@ant-design/pro-components';
import { AntDesignOutlined } from '@ant-design/icons';
import { uploadFileUsingPost } from '@/services/stephen-backend/fileController';

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
      await updateUserUsingPost({
        ...values,
        id: user?.id,
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
          layout="horizontal"
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
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <ProFormText name="userName" label="用户名" />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <ProFormText name="userPhone" label="电话" />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <ProFormText name="userEmail" label="邮箱" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <ProFormTextArea name="userProfile" label="简介" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Avatar
                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 100, xxl: 120 }}
                icon={<AntDesignOutlined />}
                src={user?.userAvatar}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <ProFormUploadButton
                title={'上传头像'}
                max={1}
                fieldProps={{
                  ...updateProps,
                }}
                name="pic"
              />
            </Col>
          </Row>
        </ProForm>
      </ProCard>
    </ProCard>
  );
};
export default BaseView;
