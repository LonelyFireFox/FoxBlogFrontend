import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getLatterNewsDataSortByTime,
  getTopicEmotionTrendData
} = api

export default modelExtend(pageModel, {
  namespace: 'SentimentAnalysis',

  subscriptions: {
  },

  effects: {
    *getLatterNewsDataSortByTime({ payload = {} }, { call, put }) {
      const data = yield call(getLatterNewsDataSortByTime, payload)
      return data;
    },
    *getTopicEmotionTrendData({ payload = {} }, { call, put }) {
      const data = yield call(getTopicEmotionTrendData, payload)
      return data;
    },

  },

  reducers: {

  },
})
