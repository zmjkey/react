import { request, config } from 'utils'

const { api } = config
const { messages } = api

export async function query (params) {
  return request({
    url: messages,
    method: 'get',
    data: params,
  })
}

export async function search(params) {
  params['page'] = params['page'] - 1;
  return request({
    url: messages + api.commons.searchId,
    method: 'get',
    data: params,
  })
}

export async function queryByPage(params) {
  params['page'] = params['page'] - 1;
  return request({
    url: messages + api.commons.pageStr,
    method: 'get',
    data: params,
  })
}
