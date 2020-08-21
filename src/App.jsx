import React from 'react'
/**
 * 配置路由：根组件配置路由
 * 1. 安装：npm i react-router-dom
 * 2. 导入路由配置的三个基础组件：BrowserRouter,Route,Link
 * 3. 使用BrowserRouter包裹根组件的模版
 * 4. 使用Route组件配置路由规则
 * 5. 使用Link组件导航路由
 */
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// 导入组件配置路由
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'

function App() {
  // 模版 =》借助路由在根组件切换页面（组件）
  return (
    <BrowserRouter>
      {/* 配置路由规则 */}
      {/* 一级路由 */}
      <Switch>
        {/* 默认首页重定向 */}
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/cityList" component={CityList} />
        <Route path="/map" component={Map} />
        {/* 404页面 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
