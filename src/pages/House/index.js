/**
 * 第二个标签栏的页面=》列表找房
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'


export default class HouseList extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏--先开发 */}
        <Filter />
        {/* 房源列表 */}
        <ul>
          <li className={styles.bg}>1</li>
          <li className='bg2'>2</li>
        </ul>
      </div>
    )
  }
}
