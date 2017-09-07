import { request, config } from 'utils'

const { api } = config
const { umsrequests } = api

export async function query (params) {
  return request({
    url: umsrequests,
    method: 'get',
    data: params,
  })
}

export async function search(params) {
  params['page'] = params['page'] - 1;
  return request({
    url: umsrequests + api.commons.searchStr,
    method: 'get',
    data: params,
  })
}

export async function queryByPage(params) {
  params['page'] = params['page'] - 1;
  return request({
    url: umsrequests + api.commons.pageStr,
    method: 'get',
    data: params,
  })
}
