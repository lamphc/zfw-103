import React, { Component } from 'react'
// 导入轮播图组件
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile'

// 导入栏目导航配置
import Navs from '../../utils/navs'

// 导入axios
import { getSwiper, getGrid, getNews } from '../../utils/api/home'
// 导入组件样式
import './index.scss'
import { BASE_URL } from '../../utils/request'
import { getCurrCity } from '../../utils'

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
    // 咨询列表
    news: [],
    // 搜索框关键词
    keyword: '',
    // 轮播图默认高度
    imgHeight: 212,
    // 控制是否自动播放
    isPlay: false,
    // 定位城市信息
    cityInfo: { label: '--', value: '' },
  }

  componentDidMount() {
    this.getAllDatas()
    this.getCity()
  }

  // 获取定位信息
  async getCity() {
    const res = await getCurrCity()
    console.log('获取定位信息：', res)
    this.setState({
      cityInfo: res,
    })
  }

  // 封装首页所有接口调用=》三和一
  getAllDatas() {
    // 使用Promise.all(array)实现=>并发执行多个promise的后台接口调用
    const promises = [getSwiper(), getGrid(), getNews()]
    Promise.all(promises).then((res) => {
      console.log('获取所有Promise对象执行完的结果：', res)
      const [swiper, groups, news] = res
      // 批量响应式
      this.setState(
        {
          swiper: swiper.data,
          groups: groups.data,
          news: news.data,
        },
        () => {
          this.setState({ isPlay: true })
        }
      )
    })
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

  // 渲染租房小组宫格
  renderGrid = () => {
    return (
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
    )
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  // 渲染顶部导航
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          {/* 城市定位 */}
          <div
            className="city"
            onClick={() => {
              this.props.history.push('/cityList')
            }}>
            {this.state.cityInfo.label}
            <i className="iconfont icon-arrow" />
          </div>
          {/* 基于input封装 */}
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        {/* 地图找房 */}
        <div
          className="map"
          onClick={() => {
            this.props.history.push('/map')
          }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  // 模版
  render() {
    return (
      <div className="Index">
        {/* 顶部导航 */}
        {this.renderTopNav()}
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
          {this.renderGrid()}
        </div>
        {/* 新闻咨询列表 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}
