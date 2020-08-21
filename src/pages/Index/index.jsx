import React, { Component } from 'react'
// 导入轮播图组件
import { Carousel, Flex } from 'antd-mobile'

// 导入axios
import { getSwiper } from '../../utils/api/home'
// 导入组件样式
import './index.css'

// 导入图片资源
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// nav的数据
const Navs = [
  {
    title: '整租',
    icon: Nav1,
    url: '/home/house',
  },
  {
    title: '合租',
    icon: Nav2,
    url: '/home/house',
  },
  {
    title: '地图找房',
    icon: Nav3,
    url: '/map',
  },
  {
    title: '发布房源',
    icon: Nav4,
    url: '/rent/add',
  },
]

/**
 * 标签栏第一个页面
 */
export default class Index extends Component {
  state = {
    // 轮播图数据
    swiper: [
      // { id: 0, imgSrc: '12.png' },
      // { id: 1, imgSrc: '12.png' },
    ],
    // 轮播图默认高度
    imgHeight: 212,
    // 控制是否自动播放
    isPlay: false,
  }

  componentDidMount() {
    this.getSwiper()
  }

  // 获取轮播图数据
  async getSwiper() {
    const { status, data } = await getSwiper()
    if (status === 200) {
      // 响应式
      //
      this.setState({ swiper: data }, () => {
        // 确保轮播图有数据，触发自动播放=>$nextTick(cb)
        this.setState({ isPlay: true })
      })
    }
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel autoplay={this.state.isPlay} infinite>
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
    )
  }

  // 渲染栏目导航
  renderNavs = () => {
    return (
      <Flex className="nav">
        {Navs.map((item) => (
          <Flex.Item
            key={item.url}
            onClick={() => {
              // 跳转路由
              this.props.history.push(item.url)
            }}>
            <img alt="" src={item.icon} />
            <p>{item.title}</p>
          </Flex.Item>
        ))}
      </Flex>
    )
  }

  // 模版
  render() {
    return (
      <div className="Index">
        {/* 轮播图 */}
        {this.renderSwiper()}
        {/* 栏目导航 */}
        {this.renderNavs()}
      </div>
    )
  }
}
