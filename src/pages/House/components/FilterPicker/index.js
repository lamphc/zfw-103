/**
 * 前三个筛选器公共的picker组件
 */
import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {

  constructor(props) {
    super(props)
    console.log('1. 组件初始化=》只执行一次')
  }

  state = {
    // 当前筛选器选中的值
    value: this.props.value
  }


  render () {
    const { onOk, onCancle, data, col } = this.props
    // console.log(data)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          value={this.state.value}
          onChange={(sel) => {
            console.log(sel)
            this.setState({ value: sel })
          }}
          cols={col}
        />

        {/* 底部按钮 */}
        <FilterFooter onOk={() => {
          onOk(this.state.value)
        }} onCancle={onCancle} />
      </>
    )
  }
}
