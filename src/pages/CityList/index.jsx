import React, { Component } from 'react'
import { getCityData, getHotCity } from '../../utils/api/city'
import { getCurrCity } from '../../utils'
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'

// List data as an array of strings
// 假数据
const list = Array.from(new Array(30)).map(() => Math.random() * 100)

class CityList extends Component {
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

  // 列表渲染的项item模版
  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    return (
      <div key={key} style={style}>
        列表项item{index}:{list[index]}
      </div>
    )
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
              rowCount={list.length}
              // 列表项的高度
              rowHeight={50}
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
