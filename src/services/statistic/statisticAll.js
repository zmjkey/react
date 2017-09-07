import { request, config } from 'utils'

const { api } = config
const { statisticAll } = api

export async function query (params) {
  return request({
    url: statisticAll,
    method: 'get',
    data: params,
  })
}

