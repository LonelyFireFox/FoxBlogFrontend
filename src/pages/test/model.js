import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  test
} = api

export default modelExtend(pageModel, {
  namespace: 'test',

  subscriptions: {
  },

  effects: {
    *test({ payload = {} }, { call, put }) {
      const data = yield call(test, payload)
      return data;
    },

  },

  reducers: {

  },
})
