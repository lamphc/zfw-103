import request from '../request'

/**
 * 用户 =》后台接口
 */

export function login (data) {
  return request.post('/user/login', data)
}