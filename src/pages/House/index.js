/**
 * 第二个标签栏的页面=》列表找房
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入局部样式
import styles from './index.module.css'
import { getCurrCity } from '../../utils'
import { getListByFilter } from '../../utils/api/house'
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/request'


export default class HouseList extends React.Component {

  state = {
    // 房源列表数据
    list: [],
    // 房源数据的总条数
    count: 0
  }


  // 回调函数：接收子组件的查询条件数据
  onFilterSel = (filters) => {
    console.log('父组件：接收用户选择的查询条件：', filters)
    // 存储查询条件
    this.filters = filters
    // 每次选择完查询条件=》重新调用接口查询房源
    this.getHouseList()
  }

  async componentDidMount () {
    fetch('http://api-haoke-dev.itheima.net/home/swiper').then((res) => {
      res.json().then((r) => console.log(r))
    })
    //  获取当前定位城市的ID
    let { value } = await getCurrCity()
    this.cityId = value
    // 默认调用列表
    this.getHouseList()
  }

  // 根据查询条件获取房源列表数据
  async getHouseList () {
    const { status, data: { list, count } } = await getListByFilter(this.cityId, this.filters)
    // console.log(status, data)
    if (status === 200) {
      this.setState({
        list,
        count
      })
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
    // 列表数据
    const { list } = this.state
    // 当前列表项的数据
    let item = list[index]
    // 处理上拉过快=》后台数据没有返回报错问题
    if (!!item) {
      // 处理图片地址
      item.src = `${BASE_URL}${item.houseImg}`
      return (
        <HouseItem {...item} key={key} style={style} />

      )
    } else {
      // 后台数据还没加载完=》显示骨架屏
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }

  }

  // 判断当前行是否渲染完
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 加载更多数据=>获取下一页数据
  /**
   * 
   * @param {*} startIndex-stopIndex 下一页数据的开始和结束位置 
   */
  loadMoreRows = ({ startIndex, stopIndex }) => {
    // console.log(startIndex, stopIndex)
    return getListByFilter(this.cityId, this.filters, startIndex, stopIndex).then((res) => {
      const { status, data: { list } } = res
      if (status === 200) {
        this.setState({
          list: [...this.state.list, ...list]
        })
      }
    })
  }


  render () {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏--先开发 */}
        <Filter onFilterSel={this.onFilterSel} />
        {/* 根据过滤条件=》渲染房源列表 */}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          // 列表数据的总条数
          rowCount={this.state.count}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className={styles.houseList}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  // 列表数据的总条数
                  rowCount={this.state.count}
                  // 控制列表宽高
                  width={width}
                  height={height}
                  // 列表项的高度 => 动态设置高度
                  rowHeight={130}
                  // 选染列表项目
                  rowRenderer={this.rowRenderer}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}
