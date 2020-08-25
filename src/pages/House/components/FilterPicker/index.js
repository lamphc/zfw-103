/**
 * 前三个筛选器公共的picker组件
 */
import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  render () {
    const { onOk, onCancle, data, col } = this.props
    // console.log(data)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={null} cols={col} />

        {/* 底部按钮 */}
        <FilterFooter onOk={onOk} onCancle={onCancle} />
      </>
    )
  }
}