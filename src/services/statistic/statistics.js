import { request, config } from 'utils'

const { api } = config
const { statistics } = api

export async function query (params) {
  return request({
    url: statistics,
    method: 'get',
    data: params,
  })
}

