import React, { useState, useEffect, useContext, useRef } from 'react'
// 第三方的hook钩子函数
import { useDrop } from 'react-use'
import useSpring from 'react-use/lib/useSpring'

import './index.scss'

/**
 * 跨多级组件通信（共享数据）
 * Context对象
 * 1. 创建Context对象：React.createContext()
 * 2. 使用Context对象的Provider组件提供数据=>value
 * 3. 使用Context对象的Consumer组件获取数据
 */
const MyContext = React.createContext()

/**
 * react-hook：使函数组件具有和class组件基本一样的功能=》比如：state(响应式)
 * hook:钩子=》帮函数组件勾出来类组件的一些能力=》语法：useXXX()
 * 使用规则：
 * 1. 只能定义到函数体的第一层
 * 2. 不能在类组件中使用hook
 */

// 约定：函数的名字以 use 开头，并且调用了其他的 Hook，则就称其为一个自定义 Hook
// 数据共享=》状态复用=>替代render-props和hoc（数据和UI的分离）
const useCounter = () => {
  const [count, setCount] = useState(0)
  // componetDidMount
  useEffect(() => {
    let id = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    // 卸载时清除定时器
    return () => clearInterval(id)
  }, [])
  return [count, setCount]
}

const Child = () => {
  // 使用hook获取context对象共享的数据
  const shareCount = useContext(MyContext)
  // console.log(shareCount)

  // 使用自定义hook
  const [count] = useCounter()
  return (
    <div>
      <h3>孙子组件</h3>
      <p style={{ color: 'red' }}>{count}</p>
      <MyContext.Consumer>{(val) => <p>{val}</p>}</MyContext.Consumer>
      <h4>{shareCount}</h4>
    </div>
  )
}

const List = () => {
  // 定义响应数据：数组
  const [list, setList] = useState([{ id: 0, name: '小红' }])

  // 使用useRef
  let ulRef = useRef()
  console.log(ulRef)

  // 使用自定义hook
  const [count, setCount] = useCounter()

  return (
    <div>
      <h1 style={{ color: 'blue' }}>{count}</h1>
      <ul ref={ulRef}>
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

// 第三方钩子hook
const Demo = () => {
  // 拖拽上传
  const state = useDrop({
    onFiles: (files) => console.log('files', files),
    onUri: (uri) => console.log('uri', uri),
    onText: (text) => console.log('text', text),
  })

  return (
    <div className="bg" style={{ width: '100%', height: '300px' }}>
      Drop something on the page.
    </div>
  )
}

const Demo2 = () => {
  const [target, setTarget] = useState(50)
  const value = useSpring(target)

  return (
    <div>
      {value}
      <br />
      <button onClick={() => setTarget(0)}>Set 0</button>
      <button onClick={() => setTarget(100)}>Set 100</button>
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
  const [name, setName] = useState('小红')
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
    console.log('go1')
  }, [name, obj])

  useEffect(() => {
    console.log('go2')
  }, [count])

  // 模版
  return (
    <MyContext.Provider value={count}>
      <h1>react-hook使用</h1>
      <hr />
      <Demo />
      <Demo2 />
      <hr />
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
          // setName((Math.random() * 100).toString(16))
          setName('伟伟同学')
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
      <hr />
      <Child />
    </MyContext.Provider>
  )
}
