export default [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: '主页',
    icon: 'AppstoreOutlined',
    component: './Home',
  },
  {
    path: '/my',
    name: '我的页面',
    icon: 'InsertRowAboveOutlined',
    routes: [
      { path: '/my', redirect: '/my/create/app' },
      { path: '/my/create/app', name: '我创建的应用', component: './MyCreate/App' },
    ],
  },
  { path: '/app/detail/:id', name: '应用详细页', component: './App', hideInMenu: true },
  {
    path: '/create',
    name: '创建',
    icon: 'AppstoreAddOutlined',
    routes: [
      { path: '/create', redirect: '/create/app' },
      { path: '/create/app', name: '创建应用', component: './Create/App' },
      { path: '/create/app/:id', name: '修改应用', component: './Create/App', hideInMenu: true },
      {
        path: '/create/question/:appId',
        name: '创建题目',
        component: './Create/Question',
        hideInMnu: true,
      },
      {
        path: '/create/scoring_result/:appId',
        name: '创建评分',
        component: './Create/ScoringResult',
        hideInMnu: true,
      },
    ],
  },
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
      { name: '应用管理', path: '/admin/app', component: './Admin/AppList' },
      { name: '题目管理', path: '/admin/question', component: './Admin/QuestionList' },
      {
        name: '评分结果管理',
        path: '/admin/scoringResult',
        component: './Admin/ScoringResultList',
      },
      { name: '用户回答管理', path: '/admin/userAnswer', component: './Admin/UserAnswerList' },
    ],
  },
  {
    path: '/review',
    name: '审核信息页',
    access: 'canAdmin',
    icon: 'UnorderedListOutlined',
    routes: [
      { path: '/review', redirect: '/review/app' },
      { path: '/review/app', name: '应用审核', component: './AppReview' },
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
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
