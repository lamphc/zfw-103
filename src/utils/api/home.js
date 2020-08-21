import request from '../request'

/**
 * 首页=》后台接口
 */

/**
 * 轮播图
 */
export function getSwiper () {
  return request.get('/home/swiper')
}

/**
 * 
 * @param {*} area 区域ID
 */
export function getGrid (area = 'AREA|88cff55c-aaa4-e2e0') {
  return request.get('/home/groups', {
    params: {
      area
    }
  })
}


