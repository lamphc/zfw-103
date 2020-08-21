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


