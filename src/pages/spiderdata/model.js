import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  fetchSpiderData,
  getPreWarned
} = api

export default modelExtend(pageModel, {
  namespace: 'spiderdata',

  state: {
    chartData: {},
    preWarnedData : {}
  },

  subscriptions: {

  },

  effects: {
    *fetchSpiderData({ payload }, { call, put }) {
      const queryData = yield call(fetchSpiderData, payload)
      yield put({
        type: 'fetchSpiderDataEnd',
        payload: queryData,
      })
      return queryData
    },
    *getPreWarned({ payload }, { call, put }) {
      const queryData = yield call(getPreWarned, payload)
      yield put({
        type: 'getPreWarnedEnd',
        payload: queryData,
      })
      return queryData
    },
  },

  reducers: {
    fetchSpiderDataEnd(state, { payload }) {
      return Object.assign({}, state, {
        chartData: payload,
      })
    },
    getPreWarnedEnd(state, { payload }) {
      return Object.assign({}, state, {
        preWarnedData: payload,
      })
    },
  },
})
