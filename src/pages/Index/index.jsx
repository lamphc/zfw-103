import React, { Component } from 'react'
// 导入轮播图组件
import { Carousel, Flex, Grid } from 'antd-mobile'

// 导入栏目导航配置
import Navs from '../../utils/navs'

// 导入axios
import { getSwiper, getGrid } from '../../utils/api/home'
// 导入组件样式
import './index.scss'
import { BASE_URL } from '../../utils/request'

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
    // 租房小组数据
    groups: [],
    // 轮播图默认高度
    imgHeight: 212,
    // 控制是否自动播放
    isPlay: false,
  }

  componentDidMount() {
    this.getSwiper()
    this.getGroups()
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

  // 获取租房小组
  getGroups = async () => {
    const { status, data } = await getGrid()
    // console.log(status, data)
    if (status === 200) {
      this.setState({ groups: data })
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
            key={item.id}
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
        {/* 租房小组 */}
        <div className="group">
          {/* title */}
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 内容content */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            hasLine={false}
            square={false}
            renderItem={(item) => (
              // item结构
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
      </div>
    )
  }
}
