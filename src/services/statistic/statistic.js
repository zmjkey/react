import { request, config } from 'utils'

const { api } = config
const { statistic } = api

export async function query (params) {
  return request({
    url: statistic,
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: statistic,
    method: 'patch',
    data: params,
  })
}
