import React from 'react';
import { Steps } from 'antd';
import { ProCard } from '@ant-design/pro-components';

interface Props {
  items: any[];
  isMobile: boolean;
  span: number;
}

/**
 * 创建步骤卡片
 * @param props
 * @constructor
 */
const CreateStepsCard: React.FC<Props> = (props) => {
  const { items, isMobile, span } = props;
  return (
    <ProCard colSpan={isMobile ? 24 : span}>
      <Steps
        direction={isMobile ? 'horizontal' : 'vertical'}
        labelPlacement="vertical"
        items={items}
      />
    </ProCard>
  );
};

export default CreateStepsCard;
