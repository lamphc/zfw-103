import React, { Component } from 'react'
import { getCityData, getHotCity } from '../../utils/api/city'
import { getCurrCity } from '../../utils'
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'

// List data as an array of strings
// 假数据
// const list = Array.from(new Array(30)).map(() => Math.random() * 100)

class CityList extends Component {
  state = {
    // 列表归类的数据
    cityList: {},
    // 列表的归类项=》拼音首字母
    cityIndex: [],
  }

  componentDidMount() {
    this.getCityList()
  }

  // 获取城市列表数据
  async getCityList() {
    const { status, data } = await getCityData()
    // console.log(status, data)
    if (status === 200) {
      // 按照拼音首字母归类城市数据
      const { cityList, cityIndex } = this.formatCityData(data)
      // 热门城市数据
      const { status, data: hot } = await getHotCity()
      // console.log(status, hot)
      if (status === 200) {
        // 把热门城市数据加入到归类数据中
        cityList['hot'] = hot
        cityIndex.unshift('hot')
      }
      // 加入当前定位城市的数据
      const curCity = await getCurrCity()
      cityList['#'] = [curCity]
      cityIndex.unshift('#')
      // 响应式
      this.setState({ cityList, cityIndex })
      console.log('归类的数据：', cityList, cityIndex)
    }
  }

  // 二次处理后台数据=》按照拼音首字母归类城市
  /**
   *
   * @param {*} data 所有城市的数据
   */
  formatCityData(data) {
    // 归类的数据
    let cityList = {},
      cityIndex
    data.forEach((item) => {
      // 获取当前item城市的拼音首字母
      const firstKey = item.short.slice(0, 1)
      if (!(firstKey in cityList)) {
        // 当前类别不存在
        cityList[firstKey] = [item]
      } else {
        // 存在=》push
        cityList[firstKey].push(item)
      }
    })
    cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex,
    }
  }

  // 格式化列表渲染的类别
  formatCateKey(cateKey) {
    switch (cateKey) {
      case '#':
        return '当前城市'
      case 'hot':
        return '热门城市'
      default:
        return cateKey.toUpperCase()
    }
  }

  // 列表渲染的项item模版
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    // const data = list[index]
    // 获取归类项和该项数据
    const { cityList, cityIndex } = this.state
    // 类别
    const cateKey = cityIndex[index]
    // 当前类别下的数据=》城市=》多个或一个
    const cateList = cityList[cateKey]

    return (
      <div key={key} style={style} className="city-item">
        {/* 类别 */}
        <div className="title">{this.formatCateKey(cateKey)}</div>
        {/* 类别下数据=》城市 => 列表渲染 */}
        {cateList.map((item) => (
          <div key={item.value} className="name">
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 动态计算列表行的高度
  /**
   *
   * @param {*} index 列表项的索引
   */
  excueHeight = ({ index }) => {
    // 获取归类项和该项数据
    const { cityList, cityIndex } = this.state
    // 类别
    const cateKey = cityIndex[index]
    // 当前类别下的数据=》城市=》多个或一个
    const cateList = cityList[cateKey]

    return 36 + 50 * cateList.length
  }

  // 模版
  render() {
    return (
      <div className="cityList">
        {/* 头部导航栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>
          城市选择
        </NavBar>
        {/* 城市选择列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              // 控制列表宽高
              width={width}
              height={height}
              // 列表数据的总长度
              rowCount={this.state.cityIndex.length}
              // 列表项的高度 => 动态设置高度
              rowHeight={this.excueHeight}
              // 选染列表项目
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default CityList
