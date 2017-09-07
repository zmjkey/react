import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query } from 'services/dashboard'
import { model } from 'models/common'
import * as stateAllService from 'services/statistic/statisticAll'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    dayData: [],
    numData: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({ type: 'query' })
          dispatch({ type: 'queryNum' })
        }
      })
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      const { success } = data
      if (success) {
        const dayData = data.list
        yield put({
          type: 'updateState',
          payload: {
            dayData,
          },
        })
      }
    },
    * queryNum ({
      payload,}, {call, put}) {
      const result = yield call(stateAllService.query, payload)
      const { success } = result
      if (success) {
        const numData = result.list
        yield put({
          type: 'updateState',
          payload: {
            numData,
          },
        })
      }
    },
  },
})
