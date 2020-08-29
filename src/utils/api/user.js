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

/**
 * 添加收藏
 * @param {*} id 房源ID
 */
export function addFav (id) {
  return request.post(`/user/favorites/${id}`)
}

/**
 * 删除收藏
 * @param {*} id 房源ID
 */
export function delFav (id) {
  return request.delete(`/user/favorites/${id}`)
}

/**
 * 获取已发布房源列表数据
 */
export function getPubHouse () {
  return request.get('/user/houses')
}