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
import { updateAppUsingPost } from '@/services/answer-backend/appController';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import { ScoringStrategy, scoringStrategyEnum } from '@/enum/ScoringStrategy';
import { uploadFileUsingPost } from '@/services/answer-backend/fileController';

interface UpdateProps {
  oldData?: API.App;
  onCancel: () => void;
  onSubmit: (values: API.AppUpdateRequest) => Promise<void>;
  visible: boolean;
}


/**
 * 更新应用模态框
 * @param props
 * @constructor
 */
const UpdateAppModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [appIcon, setAppIcon] = useState(oldData?.appIcon);
  if (!oldData) {
    return <></>;
  }

  /**
   * 应用封面更新
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
            biz: 'app_icon',
          },
          {
            file: file,
          },
          file,
        );
        onSuccess(res.data);
        setAppIcon(res.data as any);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setAppIcon(undefined);
    },
  };

  /**
   * 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.AppUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
      const res = await updateAppUsingPost({
        ...fields,
        id: oldData?.id,
        appIcon,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('更新成功');
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      hide();
      message.error(`更新失败${error.message}, 请重试!`);
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'更新应用信息'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProForm<API.AppUpdateRequest>
        onFinish={async (values: API.AppUpdateRequest) => {
          const success = await handleUpdate(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        initialValues={oldData}
      >
        <ProFormText name={'appName'} label={'应用名称'} />
        <ProFormTextArea name={'appDesc'} label={'应用简介'} />
        <ProFormSelect name={'appType'} label={'应用类型'} valueEnum={appTypeEnum}>
          <Select>
            <Select.Option value={AppType.SCORE}>{appTypeEnum[AppType.SCORE].text}</Select.Option>
            <Select.Option value={AppType.TEXT}>{appTypeEnum[AppType.TEXT].text}</Select.Option>
          </Select>
        </ProFormSelect>
        <ProFormSelect name={'scoringStrategy'} label={'评分策略'} valueEnum={scoringStrategyEnum}>
          <Select>
            <Select.Option value={ScoringStrategy.AI}>
              {scoringStrategyEnum[ScoringStrategy.AI].text}
            </Select.Option>
            <Select.Option value={ScoringStrategy.CUSTOM}>
              {scoringStrategyEnum[ScoringStrategy.CUSTOM].text}
            </Select.Option>
          </Select>
        </ProFormSelect>
        <ProFormUploadDragger
          title={'上传应用封面'}
          label={'应用封面'}
          max={1}
          fieldProps={{
            ...uploadProps,
          }}
          name="pic"
        />
      </ProForm>
    </Modal>
  );
};
export default UpdateAppModal;
