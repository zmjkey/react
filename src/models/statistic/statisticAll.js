/* global window */
import { query } from 'services/statistic/statisticAll'
import {timeTypes} from "../../utils/config";

export default {
  namespace: 'statisticAll',
  state: {
    data: {},
    types: timeTypes,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/statisticAll') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * query({
              payload,
            }, {call, put}) {
      const data = yield call(query, payload)
      const {success, message, status, ...other} = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, {payload}) {
      const {data} = payload
      return {
        ...state,
        data,
      }
    },
  },
}
