import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  getTreeHole, createTreeHole
} = api

export default modelExtend(pageModel, {
  namespace: 'Treehole',

  state: {
    treeHoleData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/treehole', pathname)
        if (match) {
          dispatch({ type: 'getTreeHole' })
        }
      })
    },
  },
  effects: {
    *getTreeHole({ payload = {} }, { call, put }) {
      const data = yield call(getTreeHole)
      const { success, list } = data
      if (success) {
        yield put({
          type: 'getTreeHoleEnd',
          payload:
            list
          ,
        })
      }
      return data
    },
    *createTreeHole({ payload = {} }, { call, put }) {
      const data = yield call(createTreeHole, payload)
      return data
    },
  },

  reducers: {
    getTreeHoleEnd(state, { payload }) {
      state.treeHoleData = payload
    },
  },
})
