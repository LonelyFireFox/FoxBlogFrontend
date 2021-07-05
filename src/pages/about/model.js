import { pathMatchRegexp } from 'utils'
import api from 'api'

const {
  getAbout
} = api

export default  {
  namespace: 'About',

  state: {
    aboutData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/about', pathname)
        if (match) {
          dispatch({ type: 'getAbout'})
        }
      })
    },
  },
  effects: {
    *getAbout({ payload = {} }, { call, put }) {
      const data = yield call(getAbout)
      const { success, ...others} = data
      if (success) {
        yield put({
          type: 'getAboutEnd',
          payload: {
            aboutData:data,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    getAboutEnd(state, { payload }) {
      const { aboutData } = payload
      return {
        ...state,
        aboutData,
      }
    },
  }
}
