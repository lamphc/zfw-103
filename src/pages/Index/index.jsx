import React, { Component } from 'react'
// 导入轮播图组件
import { Carousel } from 'antd-mobile'

// 导入axios
import request from '../../utils/request'

/**
 * 标签栏第一个页面
 */
export default class Index extends Component {
  state = {
    // 轮播图数据
    swiper: [],
    // 轮播图默认高度
    imgHeight: 212,
  }

  componentDidMount() {
    this.getSwiper()
  }

  // 获取轮播图数据
  async getSwiper() {
    const { status, data } = await request.get('/home/swiper')
    if (status === 200) {
      // 响应式
      this.setState({ swiper: data.body })
    }
  }

  render() {
    return (
      <div className="Index">
        {/* 轮播图 */}
        <Carousel autoplay={true} infinite>
          {this.state.swiper.map((item) => (
            <a
              key={item.id}
              href="http://www.itheima.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight,
                background: '#eee',
              }}>
              <img
                src={`http://api-haoke-dev.itheima.net${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // 轮播图图片适配=》自适应
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    )
  }
}
