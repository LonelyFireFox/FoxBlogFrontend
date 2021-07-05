import { router, pathMatchRegexp } from '../../utils'
import api from 'api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      //select主要是在effects中，取出state的值，它的参数是一个function函数，函数的第一个参数，就是state。
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (['', '/'].includes(from)){
            router.push('/spiderdata')
          }
          else router.push(from)
        } else {
          router.push('/spiderdata')
        }
        return 1
      } else {
        return 0
      }
    },
  },
}
