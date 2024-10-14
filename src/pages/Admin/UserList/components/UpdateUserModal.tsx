import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateUserUsingPost } from '@/services/stephen-backend/userController';
import { uploadFileUsingPost } from '@/services/stephen-backend/fileController';
import { UserRole, userRoleEnum } from '@/enum/UserRole';

interface UpdateProps {
  oldData?: API.User;
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateUserUsingPost(fields);
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
 * 更新用户 Modal
 * @param props
 * @constructor
 */
const UpdateUserModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  // 用户头像
  const [userAvatar, setUserAvatar] = useState<string>('');
  /**
   * 用户更新头像
   */
  const uploadProps: UploadProps = {
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
        setUserAvatar(res.data as string);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setUserAvatar('');
    },
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新用户'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer={null}
    >
      <ProForm<API.User>
        initialValues={oldData}
        onFinish={async (values: API.UserUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
            userAvatar: userAvatar,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText name={'userAccount'} label={'账号'} />
        <ProFormText name={'userName'} label={'用户名'} />
        <ProFormTextArea name={'userProfile'} label={'简介'} />
        <ProFormText name={'userPhone'} label={'电话'} />
        <ProFormText name={'userEmail'} label={'邮箱'} />
        <ProFormUploadDragger
          title={'上传头像'}
          label={'头像'}
          max={1}
          fieldProps={{
            ...uploadProps,
          }}
          name="pic"
        />
        <ProFormSelect name={'userRole'} label={'权限'} valueEnum={userRoleEnum}>
          <Select>
            <Select.Option value={UserRole.ADMIN}>
              {userRoleEnum[UserRole.ADMIN].text}
            </Select.Option>
            <Select.Option value={UserRole.USER}>{userRoleEnum[UserRole.USER].text}</Select.Option>
            <Select.Option value={UserRole.BAN}>{userRoleEnum[UserRole.BAN].text}</Select.Option>
          </Select>
        </ProFormSelect>
      </ProForm>
    </Modal>
  );
};
export default UpdateUserModal;
