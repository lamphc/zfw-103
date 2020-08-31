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

/**
 * 查询小区
 * @param {*} name 关键词
 * @param {*} id 当前定位城市的ID
 */
export function getCommunity (name, id) {
  return request.get('/area/community', {
    params: { name, id }
  })
}

/**
 * 查询地图找房需要的数据=》下钻数据
 * 1. 城市ID =》 当前城市下区的房源数据
 * 2. 城市下某个区的ID =》区下的镇/街道的房源数据
 * 3. 镇/街道的ID => 小区的房源数据
 * @param {*} id 区域ID
 */
export function getMapDataById (id) {
  return request.get('/area/map', {
    params: { id }
  })
}



