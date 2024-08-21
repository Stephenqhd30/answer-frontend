import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {STEPHEN_AUTHOR, STEPHEN_BLOG, STEPHEN_DEFAULT_MESSAGE, STEPHEN_GITHUB} from '@/constants';

const Footer: React.FC = () => {
  const defaultMessage = STEPHEN_DEFAULT_MESSAGE;
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${defaultMessage} ${currentYear}`}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'StephenBlog',
          title: STEPHEN_AUTHOR,
          href: STEPHEN_BLOG,
          blankTarget: true
        },
        {
          key: 'StephenGithub',
          title: <GithubOutlined/>,
          href: STEPHEN_GITHUB,
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
