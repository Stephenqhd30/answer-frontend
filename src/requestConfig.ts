import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { BASE_URL } from '@/constants';


// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

/**
 * 请求参数的处理
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: BASE_URL,
  // 开启请求携带cookie
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 得到响应的请求地址
      const requestPath = response.config.url ?? '';
      // 响应
      const { data } = response as unknown as ResponseStructure;
      if (!data) {
        throw new Error('服务异常');
      }
      // 错误码的处理
      const code: number = data.code;
      // 未登录，且不为获取用户登录信息接口
      if (
        code === 40100 &&
        !requestPath.includes('user/get/login') &&
        !location.pathname.includes('/user/login')
      ) {
        // 跳转至登录页面
        window.location.href = `/user/login?redirect=${window.location.href}`;
        throw new Error('用户还未登录,请先登录');
      }

      if (code !== 0) {
        throw new Error(data?.message ?? '服务器错误');
      }

      return response;
    },
  ],
};
