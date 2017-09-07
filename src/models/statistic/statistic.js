/* global window */
import pathToRegexp from 'path-to-regexp'
import { query } from 'services/statistic/statistics'
import {timeTypes} from "../../utils/config";

export default {
  namespace: 'statistic',
  state: {
    data: {},
    types: timeTypes,
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(() => {
        const match = pathToRegexp('/statistics/:time').exec(location.pathname)
        if (match) {
          dispatch({type: 'query', payload: {time: match[1]}})
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
