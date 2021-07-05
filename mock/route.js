import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [

  /*{
    id: '4',
    breadcrumbParentId: '1',
    name: 'UI Element',
    zh: {
      name: 'UI组件'
    },
    'pt-br': {
      name: 'Elementos UI'
    },
    icon: 'camera-o',
  },
  {
    id: '45',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: 'Editor',
    zh: {
      name: 'Editor'
    },
    'pt-br': {
      name: 'Editor'
    },
    icon: 'edit',
    route: '/UIElement/editor',
  },
  {
    id: '5',
    breadcrumbParentId: '1',
    name: 'Charts',
    zh: {
      name: 'Charts'
    },
    'pt-br': {
      name: 'Graficos'
    },
    icon: 'code-o',
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'ECharts',
    zh: {
      name: 'ECharts'
    },
    'pt-br': {
      name: 'ECharts'
    },
    icon: 'line-chart',
    route: '/chart/ECharts',
  },
  {
    id: '52',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'HighCharts',
    zh: {
      name: 'HighCharts'
    },
    'pt-br': {
      name: 'HighCharts'
    },
    icon: 'bar-chart',
    route: '/chart/highCharts',
  },
  {
    id: '53',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'Rechartst',
    zh: {
      name: 'Rechartst'
    },
    'pt-br': {
      name: 'Rechartst'
    },
    icon: 'area-chart',
    route: '/chart/Recharts',
  },
*/
  //LonelyFirefox

  /*{
    id: '60',
    breadcrumbParentId: '1',
    name: 'Test',
    zh: {
      name: 'Test'
    },
    icon: 'user',
    route: '/test',
  },
  {
    id: '61',
    name: 'SpiderData',
    zh: {
      name: '首页'
    },
    icon: 'home',
    route: '/spiderdata',
  },*/
  {
    id: '63',
    // breadcrumbParentId: '61',
    name: 'HotTopic',
    zh: {
      name: '热点话题分析'
    },
    icon: 'bar-chart',
    route: '/hottopic',
  },
  {
    id: '64',
    // breadcrumbParentId: '1',
    name: 'SentimentAnalysis',
    zh: {
      name: '情感分析'
    },
    icon: 'area-chart',
    route: '/sentimentanalysis',
  },
  {
    id: '65',
    // breadcrumbParentId: '1',
    name: 'PreWarning',
    zh: {
      name: '舆情预警'
    },
    icon: 'warning',
    route: '/prewarning',
  },
  {
    id: '62',
    // breadcrumbParentId: '1',
    name: 'SpiderConfig',
    zh: {
      name: '数据爬取配置'
    },
    icon: 'setting',
    route: '/spiderconfig',
  },
  {
    id: '66',
    // breadcrumbParentId: '1',
    name: 'TaskMonitor',
    zh: {
      name: '任务监控'
    },
    icon: 'bars',
  },
  {
    id: '67',
    breadcrumbParentId: '66',
    menuParentId: '66',
    name: 'hbasemonitor',
    zh: {
      name: 'HBase监控'
    },
    icon: 'line-chart',
    route: '/taskmonitor/hbasemonitor',
  },
  {
    id: '68',
    breadcrumbParentId: '66',
    menuParentId: '66',
    name: 'hdfsmonitor',
    zh: {
      name: 'Hdfs监控'
    },
    icon: 'line-chart',
    route: '/taskmonitor/hdfsmonitor',
  },
  {
    id: '69',
    breadcrumbParentId: '66',
    menuParentId: '66',
    name: 'yarnmonitor',
    zh: {
      name: 'Yarn监控'
    },
    icon: 'line-chart',
    route: '/taskmonitor/yarnmonitor',
  },


/*  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘'
    },
    'pt-br': {
      name: 'Dashboard'
    },
    route: '/dashboard',
  },*/
  {
    id: '2',
    name: 'Users',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'user',
    route: '/user',
  },

 /* {
    id: '7',
    breadcrumbParentId: '1',
    name: 'Posts',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Posts'
    },
    icon: 'shopping-cart',
    route: '/post',
  },*/
  {
    id: '21',
    menuParentId: '-1',
    name: 'User Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/user/:id',
  },
  {
    id: '3',
    name: 'Request',
    zh: {
      name: 'Request'
    },
    'pt-br': {
      name: 'Requisição'
    },
    icon: 'api',
    route: '/request',
  },



  //-----------------Blog Page Url----------------------

  {
    id: '101',
    name: 'Home',
    zh: {
      name: '首页'//大本营
    },
    icon: 'home',
    route: '/home',
  },
  {
    id: '102',
    name: 'Article',
    zh: {
      name: '文章详情'
    },
    icon: 'home',
    route: '/article/:id',
  },
  {
    id: '103',
    name: 'About',
    zh: {
      name: '关于我'
    },
    icon: 'home',
    route: '/about',
  },
  {
    id: '104',
    name: 'Archive',
    zh: {
      name: '卷宗'
    },
    icon: 'home',
    route: '/archive',
  },
  {
    id: '105',
    name: 'Treehole',
    zh: {
      name: '树洞'
    },
    icon: 'home',
    route: '/treehole',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
