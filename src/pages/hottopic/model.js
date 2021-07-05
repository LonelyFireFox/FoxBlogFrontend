import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getLatterHotTopicByDay,
  getLatterNewsDataByDay,
  getNewsDataByClusterId,
  getTopicDataGroupByDate,
  getTopicTrendData
} = api

export default modelExtend(pageModel, {
  namespace: 'HotTopic',

  subscriptions: {
  },

  effects: {
    *getLatterHotTopicByDay({ payload = {} }, { call, put }) {
      const data = yield call(getLatterHotTopicByDay, payload)
      return data;
    },
    *getLatterNewsDataByDay({ payload = {} }, { call, put }) {
      const data = yield call(getLatterNewsDataByDay, payload)
      return data;
    },
    *getNewsDataByClusterId({ payload = {} }, { call, put }) {
      const data = yield call(getNewsDataByClusterId, payload)
      return data;
    },
    *getTopicDataGroupByDate({ payload = {} }, { call, put }) {
      const data = yield call(getTopicDataGroupByDate, payload)
      return data;
    },
    *getTopicTrendData({ payload = {} }, { call, put }) {
      const data = yield call(getTopicTrendData, payload)
      return data;
    },
  },

  reducers: {

  },
})
