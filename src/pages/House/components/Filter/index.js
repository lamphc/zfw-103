/**
 * 过滤器组件
 */
import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
import { getFilters } from '../../../../utils/api/house'
import { getCurrCity } from '../../../../utils'


// 设计选中筛选器的默认状态
const titleSeledStatus = {
  // 区域
  area: false,
  // 方式
  mode: false,
  // 价格
  price: false,
  // 更多
  more: false
}

export default class Filter extends Component {

  state = {
    // 筛选器的选中状态
    titleSeledStatus: { ...titleSeledStatus },
    // 当前选择的是那个筛选器
    openType: ''
  }

  componentDidMount () {
    this.getFilterData()
  }



  // 获取筛选条件数据
  async getFilterData () {
    //  获取定位城市数据
    const { value } = await getCurrCity()
    const { status, data } = await getFilters(value)
    console.log(status, data)
    if (status === 200) {
      // 存储筛选条件数据到this
      this.filterDatas = data
    }
  }

  // 修改筛选器title的选中状态
  onTitleClick = (type) => {
    this.setState(
      {
        // 修改点击筛选器高亮状态
        titleSeledStatus: { ...titleSeledStatus, [type]: true },
        // 当前选择的是那个筛选器
        openType: type
      }
    )
    console.log('调用父组件的方法=》当前点击的筛选器', type)
  }

  // 是否显示前三个筛选器的内容
  isShowPicker () {
    // 当前选中的筛选器
    const { openType } = this.state
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }

  // 点击确定的时候执行
  onOk = (sel) => {
    console.log('当前筛选器选中的值：', sel)
    this.setState({
      openType: ''
    })
  }

  // 点击取消时候执行 => 关闭筛选器
  onCancle = () => {
    this.setState({
      openType: ''
    })
  }

  // 传递数据并渲染picker组件
  renderFilterPicker () {
    if (this.isShowPicker()) {
      // 处理当前用户选中的筛选器的数据
      /**
       * 1. 知道当前用户点击的是谁=》openType
       * 2. 根据openType获取对应筛选器数据=》传递给FilterPicker
       */
      const { openType } = this.state
      // 获取前三个筛选器数据
      const { area, subway, rentType, price } = this.filterDatas
      let curFilterData = [], col = 1
      switch (openType) {
        case 'area':
          col = 3
          curFilterData = [area, subway]
          break
        case 'mode':
          curFilterData = rentType
          break
        default:
          curFilterData = price
      }

      return <FilterPicker data={curFilterData} col={col} onOk={this.onOk} onCancle={this.onCancle} />
    }
    return null
  }

  render () {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? <div onClick={this.onCancle} className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSeledStatus={this.state.titleSeledStatus} onTitleClick={this.onTitleClick} />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderFilterPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
