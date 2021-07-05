import request from '../utils/request'
import { apiPrefix, address } from '../utils/config'

import api from './api'

const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }else if(paramsArray.length === 3){
    // todo 后续统一修改服务端地址可以考虑这个地方
    method = paramsArray[0]
    // url = paramsArray[1]+paramsArray[2]
    url = address+paramsArray[2]
  }

  return function(data) {
    // console.log("data ===>> " , data);
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  // console.log("api[key] = " + api[key]);
  APIFunction[key] = gen(api[key])
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

export default APIFunction
