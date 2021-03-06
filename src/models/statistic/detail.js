/* global location */
import pathToRegexp from 'path-to-regexp'
import {query} from '../../services/statistic/statistic'

export default {

  namespace: 'statisticDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(() => {
        const match = pathToRegexp('/statistic/:id').exec(location.pathname)
        if (match) {
          dispatch({type: 'query', payload: {id: match[1]}})
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
