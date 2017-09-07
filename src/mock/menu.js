const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '8',
    bpid: '1',
    name: 'Umsrequest',
    icon: 'user',
    route: '/umsrequest',
  },
  {
    id: '81',
    mpid: '-1',
    bpid: '8',
    name: 'Umsrequest Detail',
    route: '/umsrequest/:id',
  },
  {
    id: '82',
    mpid: '-1',
    bpid: '8',
    name: 'Statistic Detail',
    route: '/statistic/:id',
  },
  {
    id: '9',
    bpid: '1',
    name: 'Message',
    icon: 'user',
    route: '/message',
  },
  {
    id: '10',
    bpid: '1',
    name: 'Statistic',
    icon: 'user',
    route: '/statisticAll',
  },
  {
    id: '101',
    mpid: '-1',
    bpid: '10',
    name: 'Statistic Time',
    route: '/statistics/:time',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
