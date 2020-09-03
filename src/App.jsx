import React, { lazy, Suspense } from 'react'
/**
 * 配置路由：根组件配置路由
 * 1. 安装：npm i react-router-dom
 * 2. 导入路由配置的三个基础组件：BrowserRouter,Route,Link
 * 3. 使用BrowserRouter包裹根组件的模版
 * 4. 使用Route组件配置路由规则
 * 5. 使用Link组件导航路由
 */
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 导入组件配置路由
import Home from './pages/Home'

// 没有懒加载
// import CityList from './pages/CityList'
// import Map from './pages/Map'
// import NotFound from './pages/NotFound'
// import HouseDetail from './components/HouseDetail'
// import Login from './pages/Login'
// import Rent from './pages/Rent'
// import RentAdd from './pages/Rent/Add'
// import Search from './pages/Rent/Search'

// 懒加载处理
/**
 * 使用lazy方法做懒加载=》传入回调函数返回动态导入的懒加载组件 =》该方法返回懒加载后的组件
 */
const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const NotFound = lazy(() => import('./pages/NotFound'))
const HouseDetail = lazy(() => import('./components/HouseDetail'))
const Login = lazy(() => import('./pages/Login'))
const Rent = lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const Search = lazy(() => import('./pages/Rent/Search'))

function App() {
  // 模版 =》借助路由在根组件切换页面（组件）
  return (
    <Suspense fallback={<center>页面组件加载中...</center>}>
      <Router>
        {/* 配置路由规则 */}
        {/* 一级路由 */}
        <Switch>
          {/* 默认首页重定向 */}
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          {/* 城市选择 */}
          <Route path="/cityList" component={CityList} />
          {/* 地图找房 */}
          <Route path="/map" component={Map} />
          {/* 房源详情 */}
          <Route path="/detail/:id" component={HouseDetail} />
          {/* 登录 */}
          <Route path="/login" component={Login} />
          {/* 已发布房源列表 */}
          <Route exact path="/rent" component={Rent} />
          {/* 发布房源 */}
          <Route path="/rent/add" component={RentAdd} />
          {/* 查询发布房源所在小区 */}
          <Route path="/rent/search" component={Search} />
          {/* 404页面 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
