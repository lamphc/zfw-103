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

// 设计筛选器选中的数据 
const filterSels = {
  // 区域
  area: ["area", "null"],
  // 方式
  mode: ["null"],
  // 价格
  price: ["null"],
  // 更多
  more: []
}


export default class Filter extends Component {


  state = {
    // 筛选器的选中状态
    titleSeledStatus: { ...titleSeledStatus },
    // 当前选择的是那个筛选器
    openType: ''
  }

  componentDidMount () {
    // 初始化筛选器选中的值
    this.filterSels = filterSels
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

  /**
   * 实现：如果筛选器，有选中条件就高亮筛选器的title（不是默认值）
   */
  handlerSelStatus () {
    // 设置选中状态
    const newSelSta = {}
    Object.keys(this.filterSels).forEach((item) => {
      // console.log(item)
      // 当前过滤器的type
      const filterType = item
      // 当前过滤器选中的值
      let cur = this.filterSels[filterType]
      // 根据当前选中的值和默认值做对比
      // 区域：默认值["area", "null"]
      if (filterType === 'area' && (cur[1] !== 'null' || cur[0] === 'subway')) {
        newSelSta[filterType] = true
      } else if (filterType === 'mode' && cur[0] !== 'null') {
        newSelSta[filterType] = true
      } else if (filterType === 'price' && cur[0] !== 'null') {
        newSelSta[filterType] = true
      } else if (filterType === 'more' && cur.length > 0) {
        newSelSta[filterType] = true
      }

      else {
        newSelSta[filterType] = false
      }
    })

    return newSelSta

  }

  // 处理查询条件数据
  handlerFilters () {
    // 获取用户选择的查询条件
    const { area, mode, price, more } = this.filterSels
    // 组装查询条件
    const filters = {}
    // 1. 区域条件: 区域和地铁
    let areaKey = area[0], areaVal
    if (area.length === 2) {
      areaVal = area[1]
    } else {
      if (area[2] !== 'null') {
        areaVal = area[2]
      } else {
        areaVal = area[1]
      }
    }
    filters[areaKey] = areaVal
    // 2. 出租方式
    filters.rentType = mode[0]
    // 3. 价格
    filters.price = price[0]
    // 4. 更多
    filters.more = more.join(',')
    console.log('当前选择的查询条件（后台）：', filters)
    return filters

  }

  // 点击确定的时候执行
  onOk = (sel) => {
    const { openType } = this.state
    console.log('当前筛选器选中的值：', sel)
    // 存储用户当前选择的筛选器条件
    this.filterSels[openType] = sel
    console.log(this.filterSels)
    this.setState({
      openType: '',
      // 处理选中条件后title的状态
      titleSeledStatus: this.handlerSelStatus()
    }, () => {
      // 传递查询条件=》父组件=》查询房源列表
      this.props.onFilterSel(this.handlerFilters())

    })
  }

  // 点击取消时候执行 => 关闭筛选器
  onCancle = () => {
    this.setState({
      openType: '',
      // 处理选中条件后title的状态
      titleSeledStatus: this.handlerSelStatus()
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
      // 当前打开的筛选器选中的值
      let curSels = this.filterSels[openType]
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

      return <FilterPicker key={openType} data={curFilterData} value={curSels} col={col} onOk={this.onOk} onCancle={this.onCancle} />
    }
    return null
  }


  renderFilterMore () {
    // 当前选中的筛选器
    const { openType } = this.state
    if (openType === 'more') {
      const { roomType, oriented, floor, characteristic } = this.filterDatas
      // 更多筛选器需要的数据
      const data = { roomType, oriented, floor, characteristic }
      // 获取用户上次选择的值
      const lastSel = this.filterSels[openType]

      return <FilterMore data={data} seled={lastSel} onOk={this.onOk} onCancle={this.onCancle} />
    }
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
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
