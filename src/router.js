import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'))
          cb(null, { component: require('routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/dashboard'))
              cb(null, require('routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'umsrequest',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/umsrequest/umsrequest'))
              cb(null, require('routes/umsrequest/'))
            }, 'umsrequest')
          },
        }, {
          path: 'umsrequest/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/umsrequest/detail'))
              cb(null, require('routes/umsrequest/detail/'))
            }, 'umsrequest-detail')
          },
        }, {
          path: 'statistic/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/statistic/detail'))
              cb(null, require('routes/statistic/detail/'))
            }, 'statistic-detail')
          },
        }, {
          path: 'statistics/:time',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/statistic/statistic'))
              cb(null, require('routes/statistic/time/'))
            }, 'statistic')
          },
        }, {
          path: 'statisticAll',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/statistic/statisticAll'))
              cb(null, require('routes/statistic/'))
            }, 'statisticAll')
          },
        }, {
          path: 'message',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/message/message'))
              cb(null, require('routes/message/'))
            }, 'message')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/login'))
              cb(null, require('routes/login/'))
            }, 'login')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
