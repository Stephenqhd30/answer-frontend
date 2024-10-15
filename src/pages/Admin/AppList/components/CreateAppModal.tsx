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
import { addAppUsingPost } from '@/services/answer-backend/appController';
import { uploadFileUsingPost } from '@/services/answer-backend/fileController';
import { AppType, appTypeEnum } from '@/enum/AppTypeEnum';
import {ScoringStrategy, scoringStrategyEnum} from '@/enum/ScoringStrategy';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.AppAddRequest) => Promise<void>;
  visible: boolean;
}


/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateAppModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 用户头像
  const [appIcon, setAppIcon] = useState();
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
   * 添加节点
   *
   * @param fields
   */
  const handleAdd = async (fields: API.AppAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addAppUsingPost({
        ...fields,
        appIcon,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('添加成功');
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      hide();
      message.error(`添加失败${error.message}, 请重试!`);
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'创建应用'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProForm<API.AppAddRequest>
        onFinish={async (values: API.AppAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
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
            <Select.Option value={ScoringStrategy.AI}>{scoringStrategyEnum[ScoringStrategy.AI].text}</Select.Option>
            <Select.Option value={ScoringStrategy.CUSTOM}>{scoringStrategyEnum[ScoringStrategy.CUSTOM].text}</Select.Option>
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
export default CreateAppModal;
