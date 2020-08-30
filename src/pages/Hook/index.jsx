import React, { useState, useEffect } from 'react'

/**
 * react-hook：使函数组件具有和class组件基本一样的功能=》比如：state(响应式)
 * hook:钩子=》帮函数组件勾出来类组件的一些能力=》语法：useXXX()
 * 使用规则：
 * 1. 只能定义到函数体的第一层
 * 2. 不能在类组件中使用hook
 */
const List = () => {
  // 定义响应数据：数组
  const [list, setList] = useState([{ id: 0, name: '小红' }])

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setList((list) => {
            let _list = [
              { id: list.length + 1, name: (Math.random() * 10).toString(16) },
              ...list,
            ]
            return _list
          })
        }}>
        add
      </button>
    </div>
  )
}

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
  // 定义一个string
  const [name, setName] = useState('')
  // 定义obj
  const [obj, setObj] = useState({ a: 1, b: 'str' })
  // 只能定义到函数体的第一层
  // if (count) {
  //   const [count2, setCount2] = useState(0)
  // }
  // console.log(count[0], count[1])

  // 当作：componentDidMount
  useEffect(() => {
    // 调用接口
    const fetchData = async () => {
      let res = await fetch('http://api-haoke-dev.itheima.net/home/swiper')
      console.log(res)
    }
    fetchData()
    console.log('组件挂载了！')
    // 当作：componentWillUnmount
    return () => console.log('组件卸载了！')
  }, [])

  // 当作生命周期钩子函数使用=》'相当于：`componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` '
  // 当作：componentDidUpdate
  useEffect(() => {
    console.log('go')
  }, [name, obj])

  // 模版
  return (
    <div>
      <h1>react-hook使用</h1>
      <p>{count}</p>
      <p>{name}</p>
      <p>
        {obj.a},{obj.b}
      </p>
      <button
        onClick={() => {
          setObj((oldObj) => {
            // 修改数据：创建一个新对象，拷贝老的状态数据
            const _oldObj = { ...oldObj }
            _oldObj.a = Math.random() * 1000
            _oldObj.b = (Math.random() * 200).toString(16)
            // 返回值：最新obj数据
            return _oldObj
          })
        }}>
        修改obj
      </button>
      <button
        onClick={() => {
          setName((Math.random() * 100).toString(16))
        }}>
        修改name
      </button>
      <button
        onClick={() => {
          setCount(count + 1)
        }}>
        修改count1
      </button>
      <button
        onClick={() => {
          setCount((ct) => {
            return ct + 1
          })
        }}>
        修改count2
      </button>
      <hr />
      <List />
    </div>
  )
}
