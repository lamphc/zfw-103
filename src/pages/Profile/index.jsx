import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal, Toast } from 'antd-mobile'

import { BASE_URL } from '../../utils/request'

import styles from './index.module.css'
import { isAuth, delToken } from '../../utils'
import { getUserData, logout } from '../../utils/api/user'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' },
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

export default class Profile extends Component {
  state = {
    // 是否登录
    isLogin: isAuth(),
    // 登录人信息
    userInfo: null,
  }

  componentDidMount() {
    this.getUserInfo()
  }

  // 获取登录用户信息=》如果登录=》获取登录人信息
  async getUserInfo() {
    const { isLogin } = this.state
    if (isLogin) {
      // 获取登录人信息
      const { status, data, description } = await getUserData()
      // console.log(status, data)
      if (status === 200) {
        // 处理头像
        // console.log(typeof data.avatar)
        data.avatar = !!data.avatar ? BASE_URL + data.avatar : null
        this.setState({
          userInfo: data,
        })
      } else {
        // token过期重新登录
        if (status === 400) {
          Toast.fail(description, 2, () => {
            this.props.history.replace('/login')
          })
        }
      }
    }
  }

  // 退出登录
  /**
   * 不可逆的操作之前=》先让用户确认是否操作
   */
  logout = () => {
    Modal.alert('操作', '确定退出登录吗???', [
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress: async () => {
          console.log('退出登录')
          // 退出登录
          /**
           * 流程：
           * 1. 调用接口退出登录（服务器）
           * 2. 删除本地token(本地)
           */
          const { status, description } = await logout()
          if (status === 200) {
            Toast.success(description, 2)
            // 退出成功后删除本地token
            delToken()
            // 不跳转=》清除登录数据
            this.setState({
              isLogin: false,
              userInfo: null,
            })
          } else {
            Toast.fail(description, 2)
          }
        },
      },
    ])
  }

  render() {
    const { history } = this.props
    const { userInfo, isLogin } = this.state

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          {/* 个人信息 */}
          <div className={styles.info}>
            <div className={styles.myIcon}>
              {/* 头像 */}
              <img
                className={styles.avatar}
                src={userInfo?.avatar ? userInfo?.avatar : DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{userInfo?.nickname || '游客'}</div>
              {/* 登录后展示： */}
              {isLogin ? (
                <>
                  <div onClick={this.logout} className={styles.auth}>
                    <span>退出</span>
                  </div>
                  <div
                    className={styles.edit}
                    onClick={() => history.push('/rent/add')}>
                    发布房源
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              ) : (
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push('/login')}>
                    去登录
                  </Button>
                </div>
              )}

              {/* 未登录展示： */}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={(item) =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
