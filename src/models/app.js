/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'
import {database} from '../mock/data_tmp'

const { queryRouteList, logoutUser, queryUserInfo, getTagList, getCategoryList } = api

const goDashboard = () => {
  // alert('goDashboard')
  // console.log("goDashboard window.location.pathname ===>> " , window.location.pathname);
  // console.log("goDashboard pathMatchRegexp ===>> " , pathMatchRegexp(['/', '/login']));
  if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
    console.log(" 进入跳转到首页 " );
    router.push({
      pathname: '/login',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
     /* {
        id: '22',
        icon: 'laptop',
        name: 'Test',
        zhName: 'test',
        router: '/test',
      },*/
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
    categories:[],
    tags:[],

  },
  subscriptions: {
    setup({ dispatch }) {
      // dispatch({ type: 'query' })
      dispatch({ type: 'init' })

      dispatch({
        type: 'getCategoryList',
      })
      dispatch({
        type: 'getTagList',
      })
    },
    /**
     * 监听路由变化，路由每次变化后，都会将变化后的路由保存到全局state的app属性中，
     * 即app.locationPathname保存当前路径信息，app.locationQuery保存query信息。
     * @param dispatch
     * @param history
     */
    setupHistory({ dispatch, history }) {
      // alert('setupHistroy')
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *init({payload},{call,put,select}){
      const routeList = database
      store.set('routeList', routeList)
    },

    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      const isInit = store.get('isInit')
      if (isInit) {
        alert(1)
        goDashboard()
        return
      }
      // 选择 state + '全局属性名（namespace）' + state属性名
      // const total = yield select((state) => state.user.currentUser )
      // console.log(total);
      const { locationPathname } = yield select(_ => _.app)
      //获取登录的用户信息
      const { success, user } = yield call(queryUserInfo, payload)
      if (success && user) {
        //已经登陆的
        alert(2)
        const { list } = yield call(queryRouteList)
        const { permissions } = user
        let routeList = list
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id)
        } else {
          //针对普通用户，过滤出允许的权限
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        store.set('routeList', routeList)
        store.set('permissions', permissions)
        store.set('user', user)
        store.set('isInit', true)
        goDashboard()
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        //注销
        // alert(3)
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', {})
        store.set('isInit', false)
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *getCategoryList({ payload = {} }, { call, put }) {
      const data = yield call(getCategoryList,payload)
      const {list, success} = data
      if(success){
        yield put({
          type: 'getCategoryListEnd',
          payload: list
        })
        return list
      }
    },
    *getTagList({ payload = {} }, { call, put }) {
      const data = yield call(getTagList,payload)
      const {list, success} = data
      if(success){
        yield put({
          type: 'getTagListEnd',
          payload: list
        })
        return list
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      // alert('updateState')
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },

    getCategoryListEnd(state, { payload }) {
      state.categories = payload
    },
    getTagListEnd(state, { payload }) {
      state.tags = payload
    },
  },
}
