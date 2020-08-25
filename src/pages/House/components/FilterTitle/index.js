/**
 * 筛选器title
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle (props) {
  // console.log(props)
  const { titleSeledStatus, onTitleClick } = props
  // 渲染筛选器的title
  const renderTitle = () => {
    return titleList.map((item) => <Flex.Item onClick={
      () => {
        // 调用父组件的方法修改高亮状态
        onTitleClick(item.type)
      }
    } key={item.type}>
      {/* 选中类名： selected => styles.selected*/}
      <span className={[styles.dropdown, titleSeledStatus[item.type] ? styles.selected : ''].join(' ')}>
        <span>{item.title}</span>
        <i className="iconfont icon-arrow" />
      </span>
    </Flex.Item>)
  }

  return (
    <Flex align="center" className={styles.root}>
      {
        renderTitle()
      }
    </Flex>
  )
}
