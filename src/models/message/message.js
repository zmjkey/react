
/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as messagesService from 'services/message/messages'
import { pageModel } from '../common'

const { query , queryByPage, search} = messagesService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'message',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}messageIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/message') {
          if (location.search.length === 0) {
            dispatch({
              type: 'query',
              payload: location.query,
            })
          } else {
            dispatch({
              type: 'search',
              payload: location.query,
            })
          }
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              size: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * queryByPage({payload = {}}, {call, put}) {
      const data = yield call(queryByPage, payload)
      if (data.code === 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.response.content,
            pagination: {
              current: data.response.number + 1,
              size: data.response.size,
              total: data.response.totalElements,
            },
          },
        })
      } else {
        throw data
      }
    },

    * search({payload = {}}, {call, put}) {
      const data = yield call(search, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              size: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ message }) => message.currentItem.id)
      const newMessage = { ...payload, id }
      const data = yield call(update, newMessage)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}MessageIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
