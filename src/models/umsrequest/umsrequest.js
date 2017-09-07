/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { update } from 'services/umsrequest/umsrequest'
import * as umsrequestsService from 'services/umsrequest/umsrequests'
import { pageModel } from '../common'

const { query, queryByPage, search } = umsrequestsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'umsrequest',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}umsrequestIsMotion`) === 'true',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/umsrequest') {
          if (location.search.length === 0) {
            dispatch({
              type: 'queryByPage',
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
            list: data.response,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
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

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ umsrequest }) => umsrequest.currentItem.id)
      const newUmsrequest = { ...payload, id }
      const data = yield call(update, newUmsrequest)
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
      window.localStorage.setItem(`${prefix}UmsrequestIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
