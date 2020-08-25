/**
 * 过滤器组件
 */
import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

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
    titleSeledStatus: { ...titleSeledStatus }
  }

  // 修改筛选器title的选中状态
  onTitleClick = (type) => {
    this.setState({ titleSeledStatus: { ...titleSeledStatus, [type]: true } })
    console.log('调用父组件的方法', type)
  }

  render () {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSeledStatus={this.state.titleSeledStatus} onTitleClick={this.onTitleClick} />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
