import { request, config } from 'utils'

const { api } = config
const { umsrequest } = api

export async function query (params) {
  return request({
    url: umsrequest,
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: umsrequest,
    method: 'patch',
    data: params,
  })
}
