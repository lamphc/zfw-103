import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { login } from '../../utils/api/user'
import { setLocalData, HZW_TOKEN } from '../../utils'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

/**
 * 表单处理
 * 受控组件=》双向绑定 =》获取表单数据
 * 受控组件：把表单元素的值交给组件状态管理=》1. 表单元素的value绑定状态数据 2. 绑定onChange事件
 */

class Login extends Component {
  // 设置响应数据
  state = {
    // 用户名
    username: '',
    // 密码
    password: '',
  }

  // 处理双向绑定
  handlerInput = (e) => {
    // console.log(e.target)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  // 登录
  login = async (e) => {
    // 阻止表单默认行为
    e.preventDefault()
    // 获取用户输入的用户名和密码
    const { username, password } = this.state
    // console.log(e, username, password)
    const { status, data, description } = await login({ username, password })
    // console.log(status, data)
    if (status === 200) {
      Toast.success(description, 1, () => {
        // 跳转路由=》我的
        this.props.history.push('/home/profile')
      })
      // 把token存储到本地
      setLocalData(HZW_TOKEN, data.token)
    } else {
      Toast.fail(description)
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">账号登录</NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.login}>
            <div className={styles.formItem}>
              <input
                value={this.state.username}
                name="username"
                onChange={this.handlerInput}
                className={styles.input}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={this.state.password}
                name="password"
                onChange={this.handlerInput}
                className={styles.input}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
