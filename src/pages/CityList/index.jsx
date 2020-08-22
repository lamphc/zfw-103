import React, { Component } from 'react'
import { getCityData, getHotCity } from '../../utils/api/city'
import { getCurrCity } from '../../utils'

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

  render() {
    return <div>CityList</div>
  }
}

export default CityList
