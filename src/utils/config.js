const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'

module.exports = {
  name: 'UMS Portal',
  prefix: 'antdAdmin',
  footerText: 'Ctrip IBU UMS Portal Admin  © 2017 IBU',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v3',
  apiPrefix3: '/api/v3',
  APIV1,
  APIV2,
  APIV3,
  api: {
    commons: {
      pageStr: '/page',
      searchStr: '/search',
      searchId: '/id',
    },
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV3}/dashboard`,
    menus: `${APIV1}/menus`,

    umsrequests: `${APIV3}/umsRequests`,
    umsrequest: `${APIV3}/umsRequests/:id`,
    statistic: `${APIV3}/messages/statistic/:id`,
    statistics: `${APIV3}/messages/statistics/:time`,
    statisticAll: `${APIV3}/messages/statisticAll`,
    messages: `${APIV3}/messages/detail`,
  },
  timeTypes: [
    {'key': '5分钟', 'value': 5 },
    {'key': '30分钟', 'value': 30 },
    {'key': '1小时', 'value': 60 },
    {'key': '1天', 'value': 1440 },
    {'key': '7天', 'value': 10080 },
    {'key': '30天', 'value': 43200 },
  ],
}
