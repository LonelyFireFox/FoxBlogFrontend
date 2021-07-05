import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getCategoryList,
  getTagList
} = api

export default modelExtend(pageModel, {
  namespace: 'LeftPersonalIntro',

  state: {
  },

  subscriptions: {
  },

  effects: {
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
  },
})
