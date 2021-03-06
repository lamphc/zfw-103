import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { login } from '../../utils/api/user'
import { setToken } from '../../utils'

import { withFormik } from 'formik'
import * as yup from 'yup'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

/**
 * 表单处理
 * 受控组件=》双向绑定 =》获取表单数据
 * 受控组件：把表单元素的值交给组件状态管理=》1. 表单元素的value绑定状态数据 2. 绑定onChange事件
 */

class Login extends Component {
  // 设置响应数据
  // state = {
  //   // 用户名
  //   username: '',
  //   // 密码
  //   password: '',
  // }

  // 处理双向绑定
  // handlerInput = (e) => {
  //   // console.log(e.target)
  //   this.setState({
  //     // key:val
  //     // [变量]:val
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // 登录
  // login = async (e) => {
  //   // 阻止表单默认行为
  //   e.preventDefault()
  //   // 获取用户输入的用户名和密码
  //   const { username, password } = this.state
  //   // console.log(e, username, password)
  //   const { status, data, description } = await login({ username, password })
  //   // console.log(status, data)
  //   if (status === 200) {
  //     Toast.success(description, 1, () => {
  //       // 跳转路由=》我的
  //       this.props.history.push('/home/profile')
  //     })
  //     // 把token存储到本地
  //     setLocalData(HZW_TOKEN, data.token)
  //   } else {
  //     Toast.fail(description)
  //   }
  // }

  render() {
    // 高阶组件传递的数据
    const {
      values, // 表单输入域的值
      touched,
      errors,
      handleChange, // 处理双向绑定（受控组件）
      handleBlur,
      // 处理表单提交
      handleSubmit,
    } = this.props
    // console.log(this.props)
    // console.log(errors)
    return (
      <div className={styles.root}>
        {/* <h1>{errors.username}</h1> */}
        {/* 顶部导航 */}
        <NavBar mode="light">账号登录</NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                name="username"
                onChange={handleChange}
                className={styles.input}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && (
              <div className={styles.error}>{errors.username}</div>
            )}
            <div className={styles.formItem}>
              <input
                value={values.password}
                name="password"
                onChange={handleChange}
                className={styles.input}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
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

const NewLogin = withFormik({
  // 设置表单响应数据 => 等价于=》类组件中定义state数据
  // 注意：表单元素的name值要和values保持一致 ==== username: 'test2', password: 'test2'
  mapPropsToValues: () => ({ username: 'test2', password: 'test2' }),

  // Custom sync validation
  // 验证表单输入框的值：
  // 1. 手动
  // validate: (values) => {
  //   console.log(values)
  //   const errors = {}

  //   if (!values.username) {
  //     errors.username = '不能为空！'
  //   }

  //   return errors
  // },
  // 2. 配置 => 基于yup的schema对象
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('账号不能为空！')
      .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: yup
      .string()
      .required('密码不能为空！')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // 表单提交事件
  handleSubmit: async (values, { props }) => {
    // console.log(formikBag)
    // 获取表单输入的值
    // console.log(values)
    // // 阻止表单默认行为
    // e.preventDefault()
    // 获取用户输入的用户名和密码
    const { username, password } = values
    // console.log(e, username, password)
    const { status, data, description } = await login({ username, password })
    // console.log(status, data)
    if (status === 200) {
      console.log(this)
      Toast.success(description, 1, () => {
        // 跳转路由=》我的 =>获取不到Login组件的this
        // 如果存在backUrl=》跳转到backUrl的页面
        if (props.location.backUrl) {
          props.history.replace(props.location.backUrl)
        } else {
          // 默认跳回个人中心
          props.history.replace('/home/profile')
        }
      })
      // 把token存储到本地
      setToken(data.token)
    } else {
      Toast.fail(description)
    }
  },
})(Login)
// 导出被高阶组件withFormik增强后的组件=》渲染
export default NewLogin
