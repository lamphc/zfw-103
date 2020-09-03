import React, { Component, lazy } from 'react'
// 导入路由配置组件
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
// 导入二级路由组件
import Index from '../Index'

// import House from '../House'
// import Profile from '../Profile'
// import Hook from '../Hook'

// 导入组件样式
import './index.css'

// 导入tabBar配置
import TabBarList from '../../utils/tabBarConfig'

// 懒加载页面
const House = lazy(() => import('../House'))
const Profile = lazy(() => import('../Profile'))
const Hook = lazy(() => import('../Hook'))

class Home extends Component {
  // 响应数据
  state = {
    count: 0,
    // tabBar当前选中的状态
    selectedTab: this.props.location.pathname,
  }

  // 渲染tabBar
  renderTabBar = () => {
    return (
      <TabBar
        unselectedTintColor="#666"
        tintColor="#33A3F4"
        barTintColor="white">
        {TabBarList.map((item) => (
          <TabBar.Item
            title={item.title}
            key={item.id}
            // 默认图标
            icon={<i className={`iconfont ${item.icon}`} />}
            // 选中的图标
            selectedIcon={<i className={`iconfont ${item.icon}`} />}
            selected={this.state.selectedTab === item.pathname}
            // 标签栏点击
            onPress={() => {
              this.props.history.push(item.pathname)
              // 选中状态
              this.setState({
                selectedTab: item.pathname,
              })
            }}
          />
        ))}
      </TabBar>
    )
  }

  render() {
    // console.log(this.props)
    return (
      <div className="home">
        {/* 配置标签栏二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        {/* 演示react-hook用法 */}
        <Route path="/home/hook" component={Hook} />

        {/* tabBar标签栏 */}
        <div className="tabBarBox">{this.renderTabBar()}</div>
      </div>
    )
  }
}

export default Home
