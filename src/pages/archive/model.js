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
    archiveData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props) => {
        const {pathname} = props
        const match = pathMatchRegexp('/archive', pathname)
        if (match) {
            dispatch({ type: 'getArchive' })
        }
      })
    },
  },
  effects: {
    *getArchive({ payload = {} }, { call, put }) {
      const data = yield call(getArchive)
      console.log("data ===>> " , data);
      const { success, list } = data
      if (success) {
        yield put({
          type: 'getArchiveEnd',
          payload: {
            archiveData:list,
          },
        })
      } else {
        throw data
      }
      return data
    },
  },

  reducers: {
    getArchiveEnd(state, { payload }) {
      // return Object.assign({}, state, {
      //   archiveData: payload
      // });
      // state.archiveData = payload
      const { archiveData } = payload
      return {
        ...state,
        archiveData,
      }
    },
  },
})
