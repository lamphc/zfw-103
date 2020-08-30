import React, { useState } from 'react'

/**
 * react-hook：使函数组件具有和class组件基本一样的功能=》比如：state(响应式)
 * hook:钩子=》帮函数组件勾出来类组件的一些能力=》语法：useXXX()
 * 使用规则：
 * 1. 只能定义到函数体到第一层
 * 2. 不能在类组件中使用hook
 */
export default function Hook() {
  // 逻辑
  // 使用useState钩子实现响应式
  /**
   * useState(value)=>设置响应数据
   * 返回一个数组：
   * 1.数组第一项=》响应数据
   * 2.数组的第二项=》修改响应数据并刷新视图
   */
  const [count, setCount] = useState(0)
  // 只能定义到函数体到第一层
  // if (count) {
  //   const [count2, setCount2] = useState(0)
  // }
  // console.log(count[0], count[1])
  // 模版
  return (
    <div>
      <h1>react-hook使用</h1>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}>
        修改count
      </button>
    </div>
  )
}
