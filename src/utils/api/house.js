import request from '../request'

/**
 * 房屋=》后台接口
 */
/**
 * 获取列表找房筛选条件数据
 * @param {*} id 当前定位城市的ID
 */
export function getFilters (id) {
  return request.get('/houses/condition', {
    params: { id }
  })
}

/**
 * 
 * @param {*} cityId 当前定位城市ID
 * @param {*} filters 查询条件
 * @param {*} start 数据开始
 * @param {*} end  数据结束
 */
export function getListByFilter (cityId, filters, start = 1, end = 20) {
  return request.get('/houses', {
    params: {
      cityId,
      ...filters,
      start,
      end
    }
  })
}

/**
 * 房源详情
 * @param {*} id 房源ID
 */
export function getDetail (id) {
  return request.get(`/houses/${id}`)
}