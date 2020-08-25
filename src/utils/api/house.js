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