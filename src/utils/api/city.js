import request from '../request'

/**
 * 城市区域=》后台接口
 */

/**
 * 根据城市名字获取城市详细信息
 */
export function getCityInfo (name) {
  // 返回是Promise
  return request.get('/area/info', {
    params: { name }
  })
}

/**
 * 获取城市相关数据
 * @param {*} level 1 表示获取所有城市数据 2 表示城市下区的数据
 */
export function getCityData (level = 1) {
  return request.get('/area/city', {
    params: { level }
  })
}

/**
 * 获取热门城市数据
 */
export function getHotCity () {
  return request.get('/area/hot')
}



