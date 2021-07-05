import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import Archive from './index'

const {
  getArchive
} = api

export default modelExtend(pageModel, {
  namespace: 'Archive',

  state: {
    archiveData: {}
  },

  subscriptions: {
  },
  effects: {
    *getArchive({ payload = {} }, { call, put }) {
      /*
      const data = yield call(getArticleById,payload)
      const { success, message, statusCode, ...other } = data
      if (success) {
        yield put({
          type: 'getArticleByIdEnd',
          payload: {
            data,
          },
        })
      } else {
        throw data
      }*/
      const data = yield call(getArchive)
      yield put({
        type: 'getArchiveEnd',
        payload: {
          data,
        },
      })
      return data
    },
  },

  reducers: {
    getArchiveEnd(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
})
