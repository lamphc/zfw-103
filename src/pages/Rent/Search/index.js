import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrCity } from '../../../utils'

import styles from './index.module.css'
import { getCommunity } from '../../../utils/api/city'

export default class Search extends Component {

  state = {
    // 搜索框的值
    searchTxt: '',
    // 小区结果列表
    tipsList: []
  }

  async componentDidMount () {
    // 获取城市ID
    const { value } = await getCurrCity()
    this.cityId = value
  }

  // 选择小区 =》返回发布房源页面
  selectComunity (item) {
    console.log(item)
    this.props.history.replace({
      pathname: '/rent/add', data: {
        // 小区ID
        id: item.community,
        // 小区名字
        name: item.communityName
      }
    })
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li onClick={() => this.selectComunity(item)} key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }
  /**
   * 根据关键词搜索小区列表（模糊匹配）
   */
  search = (val) => {
    // console.log(val)
    let _val = val.trim()
    // 处理空的情况
    if (_val.length === 0) {
      // console.log(_val)
      return this.setState({ searchTxt: '', tipsList: [] })
    }
    this.setState({ searchTxt: val }, () => {
      // 函数防抖
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 根据关键词查询小区数据
        let { status, data } = await getCommunity(val, this.cityId)
        console.log(status, data)
        if (status === 200) {
          this.setState({ tipsList: data })
        }
      }, 600)
    })
  }

  render () {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.search}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
