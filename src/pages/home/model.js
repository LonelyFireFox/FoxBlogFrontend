import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getArticleList,
  getArticleListByPage,
  getArticleListByCategory,
  getArticleListByCategoryAndPage,
  getArticleListByTags,
  getCategoryList,
  getTagList
} = api

export default modelExtend(pageModel, {
  namespace: 'Home',

  state: {
    articleData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props) => {
        const {pathname,query, search} = props
        let param = Object.assign({},query)
        const match = pathMatchRegexp('/home', pathname)
        if (match) {
          // 简单说就是，page没有就给初始化个1，实际上没有page，也就是page=1的情况
          // 然后根据其他参数比如分类、标签等进行判断选择对应的api
          // todo 这里更好的方式应该是通过修改api的工具方法request进行动态识别url上的参数，哪怕没传也能调用同一个url这才方便
          if(!param.page){
            param.page = '1'
          }
          if(param.category){
            //有分类
            dispatch({ type: 'getArticleListByCategoryAndPage', payload: param })
          }else if(param.tags){
            //todo 加入标签过滤,可以考虑实现多选
            dispatch({ type: 'getArticleListByTags', payload: param })
          }else{
            dispatch({ type: 'getArticleListByPage', payload: param })
          }
        }
      })
    },
  },

  effects: {
    *getArticleList({ payload = {} }, { call, put }) {
      const data = yield call(getArticleList)
      if(data && data.statusCode && data.statusCode === 200){
        yield put({
          type: 'getArticleListEnd',
          payload: data
        });
      }
      return data
    },
    *getArticleListByPage({ payload = {} }, { call, put }) {
      const data = yield call(getArticleListByPage,payload)
      if(data && data.statusCode && data.statusCode === 200){
        yield put({
          type: 'getArticleListEnd',
          payload: data
        });
      }
      return data
    },
    *getArticleListByTags({ payload = {} }, { call, put }) {
      const data = yield call(getArticleListByTags,payload)
      if(data && data.statusCode && data.statusCode === 200){
        yield put({
          type: 'getArticleListEnd',
          payload: data
        });
      }
      return data
    },
    *getArticleListByCategoryAndPage({ payload = {} }, { call, put }) {
      const data = yield call(getArticleListByCategoryAndPage,payload)
      if(data && data.statusCode && data.statusCode === 200){
        yield put({
          type: 'getArticleListEnd',
          payload: data
        });
      }
      return data
    },
    *getCategoryList({ payload = {} }, { call, put }) {
      const data = yield call(getCategoryList,payload)
      return data
    },
    *getTagList({ payload = {} }, { call, put }) {
      const data = yield call(getTagList,payload)
      return data
    },
  },

  reducers: {
    getArticleListEnd(state, {payload}) {
      return Object.assign({}, state, {
        articleData: payload
      });
    }
  },
})
