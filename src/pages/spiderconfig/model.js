import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getCurrentSpiderList,
  getSpiderById,
  createSpider,
  deleteSpiderById
} = api

export default modelExtend(pageModel, {
  namespace: 'SpiderConfig',

  state: {
    configData : {}
  },

  subscriptions: {
  },

  effects: {
    *getCurrentSpiderList({ payload }, { call, put }) {
      const queryData = yield call(getCurrentSpiderList);
      // const {configs} = queryData;
      yield put({
        type: 'getCurrentSpiderListEnd',
        payload: queryData
      });
      return queryData;
    },
    *getSpiderById({ payload }, { call, put }) {
      const data = yield call(getSpiderById,payload);
      return data;
    },
    *createSpider({ payload }, { call, put }) {
      const data = yield call(createSpider,payload);
      return data;
    },
    *deleteSpiderById({ payload }, { call, put }) {
      const data = yield call(deleteSpiderById,payload);
      return data;
    },
  },

  reducers: {
    getCurrentSpiderListEnd(state, {payload}) {
      return Object.assign({}, state, {
        configData: payload
      });
      // return {...state, ...payload}
    }
  }
})
