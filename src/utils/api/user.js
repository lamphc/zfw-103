import request from '../request'


/**
 * 用户 =》后台接口
 */

export function login (data) {
  return request.post('/user/login', data)
}

/**
 * 获取当前登录人信息
 */
export function getUserData () {
  return request.get('/user')
}


/**
 * 退出登录
 */
export function logout () {
  return request.post('/user/logout')
}

/**
 * 查询房源是否收藏过
 * @param {*} id 房源ID
 */
export function checkFav (id) {
  return request.get(`/user/favorites/${id}`)
}