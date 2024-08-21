export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '用户登录', path: '/user/login', component: './User/Login' },
      { name: '用户注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', path: '/admin/user', component: './Admin/UserList' },
    ],
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'user',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', path: '/account/center', component: './Account/Center' },
      { name: '个人设置', path: '/account/settings', component: './Account/Settings' },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
