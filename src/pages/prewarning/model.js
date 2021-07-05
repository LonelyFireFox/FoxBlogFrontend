import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getAll,createPreWarning,updatePreWarning,deletePreWarningById,repealMore,warnMore,deleteMore
} = api

export default modelExtend(pageModel, {
  namespace: 'PreWarning',

  state: {
    preWarningData : {}
  },

  subscriptions: {
  },

  effects: {
    *getAll({ payload = {} }, { call, put }) {
      const data = yield call(getAll)
      yield put({
        type: 'getAllEnd',
        payload: data
      });
      return data;
    },
    *createPreWarning({ payload }, { call, put }) {
      const data = yield call(createPreWarning,payload);
      return data;
    },
    *updatePreWarning({ payload }, { call, put }) {
      const data = yield call(updatePreWarning,payload);
      return data;
    },
    *deletePreWarningById({ payload }, { call, put }) {
      const data = yield call(deletePreWarningById,payload);
      return data;
    },
    *repealMore({ payload }, { call, put }) {
      const data = yield call(repealMore,payload);
      return data;
    },
    *warnMore({ payload }, { call, put }) {
      const data = yield call(warnMore,payload);
      return data;
    },
    *deleteMore({ payload }, { call, put }) {
      const data = yield call(deleteMore,payload);
      return data;
    },
  },

  reducers: {
    getAllEnd(state, {payload}) {
      return Object.assign({}, state, {
        preWarningData: payload
      });
    }
  },
})
