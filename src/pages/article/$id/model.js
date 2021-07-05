import { pathMatchRegexp } from 'utils'
import api from 'api'

const { getArticleById, getCommentsByPostId, createComment, like, likeComment, dislikeComment  } = api

export default {
  namespace: 'articleDetail',

  state: {
    data: {},
    commentsList:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/article/:id', pathname)
        if (match) {
          //初始化文章详情数据
          dispatch({ type: 'getArticleById', payload: { id: match[1] } })
          //初始化评论数据
          dispatch({type:'getCommentsByPostId',payload:{postId: match[1]}})
        }
      })
    },
  },

  effects: {
    *getArticleById({ payload }, { call, put }) {
      const data = yield call(getArticleById, payload)
      const { success, message, statusCode, ...other } = data
      if (success) {
        yield put({
          type: 'getArticleByIdEnd',
          payload: {
            data,
          },
        })
      } else {
        throw data // TODO ??
      }
    },
    *getCommentsByPostId({ payload }, { call, put }) {
      const data = yield call(getCommentsByPostId, payload)
      const { success, list } = data
      if (success) {
        yield put({
          type: 'getCommentsByPostIdEnd',
          payload: list,
        })
      }
      return list
    },
    *createComment({ payload }, { call, put }) {
      const data = yield call(createComment, payload)
      return data
    },
    *like({ payload }, { call, put }) {
      const data = yield call(like, payload)
      if(data.success){
        yield put({
          type: 'likeEnd',
          payload: data,
        })
      }
      return data
    },
    *likeComment({ payload }, { call, put }) {
      const data = yield call(likeComment, payload)
      if(data.success){
        yield put({
          type: 'likeCommentEnd',
          payload: data,
        })
      }
      return data
    },
    *dislikeComment({ payload }, { call, put }) {
      const data = yield call(dislikeComment, payload)
      if(data.success){
        yield put({
          type: 'dislikeCommentEnd',
          payload: data,
        })
      }
      return data
    },
  },

  reducers: {
    getArticleByIdEnd(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
    getCommentsByPostIdEnd(state, { payload }) {
      state.commentsList = payload
    },
    likeEnd(state, { payload }) {
      const {like_count} = payload
      state.data.like_count = like_count
    },
    likeCommentEnd(state, { payload }) {
      const {like_count, id} = payload
      state.commentsList.map(item => {
        if(item.id === id){
          item.like_count = like_count
          return
        }
      })
    },

    dislikeComment(state, { payload }) {
      const {dislike_count, id} = payload
      state.commentsList.map(item => {
        if(item.id === id){
          item.dislike_count = dislike_count
          return
        }
      })
    },

  },
}
