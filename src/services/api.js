export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  address: 'http://192.168.1.102:8000',
  //跨域接口
  //格式：请求方式 地址 映射地址
  test : 'GET http://127.0.0.1:5000 /todos',
  //爬虫数据与任务设置相关接口
  fetchSpiderData : 'GET http://127.0.0.1:8999 /api/spider/newsdata/fetchSpiderData/:day',
  getCurrentSpiderList : 'GET http://127.0.0.1:5000 /api/spiders',
  getSpiderById : 'GET http://127.0.0.1:5000 /api/spider/:id',
  createSpider : 'POST http://127.0.0.1:5000 /api/spider',
  deleteSpiderById : 'DELETE http://127.0.0.1:5000 /api/spider/:id',

  //热点话题相关接口
  getLatterHotTopicByDay : 'GET http://localhost:8999 /api/core/clustertopic/getLatterHotTopicByDay/:id',
  getLatterNewsDataByDay : 'GET http://localhost:8999 /api/core/clustertopic/getLatterNewsDataByDay/:id',
  getNewsDataByClusterId : 'GET http://localhost:8999 /api/core/clustertopic/getNewsDataByClusterId/:id',
  getTopicDataGroupByDate : 'GET http://localhost:8999 /api/core/clustertopic/getTopicDataGroupByDate/:day',
  getTopicTrendData : 'POST http://localhost:8999 /api/core/clustertopic/getTopicTrendData',

  //情绪分析相关接口
  getLatterNewsDataSortByTime : 'GET http://localhost:8999 /api/spider/newsdata/getLatterNewsDataSortByTime',
  getTopicEmotionTrendData : 'POST http://localhost:8999 /api/spider/newsdata/getTopicEmotionTrendData',

  //舆情预警相关接口
  getAll : 'GET http://localhost:8999 /api/prewarning/getAll',
  createPreWarning : 'POST http://localhost:8999 /api/prewarning',
  updatePreWarning : 'PUT http://localhost:8999 /api/prewarning',
  deletePreWarningById : 'DELETE http://localhost:8999 /api/prewarning/:id',
  repealMore : 'PUT http://localhost:8999 /api/prewarning/repealMore/:ids',
  warnMore : 'PUT http://localhost:8999 /api/prewarning/warnMore/:ids',
  deleteMore : 'DELETE http://localhost:8999 /api/prewarning/deleteMoreByIds/:ids',
  getPreWarned : 'GET http://localhost:8999 /api/prewarning/getPreWarned',

  //-----------------Blog API----------------------
  //文章相关
  getArticleList : 'GET http://192.168.1.102:8000 /api/v1/posts',
  getArticleListByPage : 'GET http://192.168.1.102:8000 /api/v1/posts?page=:page',
  getArticleListByTags : 'GET http://192.168.1.102:8000 /api/v1/posts?tags=:tags',
  getArticleListByCategoryAndPage : 'GET http://192.168.1.102:8000 /api/v1/posts?page=:page&category=:category',
  getArticleById : 'GET http://192.168.1.102:8000 /api/v1/posts/:id',
  like : 'PUT http://192.168.1.102:8000 /api/v1/posts/:id/like/',

  //分类相关
  getCategoryList : 'GET http://192.168.1.102:8000 /api/v1/categories/getCategoryAndCount',


  //标签相关
  getTagList : 'GET http://192.168.1.102:8000 /api/v1/tags/getTagsAndCount',

  //评论相关
  createComment : 'POST http://192.168.1.102:8000 /api/v1/comments/',
  getCommentsByPostId : 'GET http://192.168.1.102:8000 /api/v1/posts/:postId/allcomments/',
  likeComment: 'PUT http://192.168.1.102:8000 /api/v1/comments/:id/like/',
  dislikeComment: 'PUT http://192.168.1.102:8000 /api/v1/comments/:id/dislike/',

  //关于我
  getAbout : 'GET http://192.168.1.102:8000 /api/v1/about/about_info/',

  //归档
  getArchive: 'GET http://192.168.1.102:8000 /api/v1/posts/archives/',

  //树洞
  getTreeHole: 'GET http://192.168.1.102:8000 /api/v1/treeholes/alltreeholes/',
  createTreeHole: 'POST http://192.168.1.102:8000 /api/v1/treeholes/',
 }
