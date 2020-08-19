import React, { Component } from 'react'
// 导入路由配置组件
import { Route, Link } from 'react-router-dom'
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'

class Home extends Component {
  render() {
    return (
      <div className="home">
        {/* 配置标签栏二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        {/* 标签栏 */}
        <div className="fix" style={{ position: 'fixed', bottom: 0, left: 0 }}>
          <Link to="/home">默认首页</Link>
          <Link to="/home/house">列表找房</Link>
          <Link to="/home/profile">我的</Link>
        </div>
      </div>
    )
  }
}

export default Home
