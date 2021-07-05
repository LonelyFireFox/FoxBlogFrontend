import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import Article from './index'

const {
  getArticleById
} = api

export default modelExtend(pageModel, {
  namespace: 'Article',

  state: {
    articleData: {}
  },

  subscriptions: {
  },
  effects: {
    *getArticleById({ payload = {} }, { call, put }) {
      console.log("11 ===>> " , 11);
      const data = yield call(getArticleById,payload)
      return data
    },
  },

  reducers: {
  },
})
