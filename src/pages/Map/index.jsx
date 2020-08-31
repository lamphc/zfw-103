import React, { Component } from 'react'
// 导入组件样式
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'
import { getCurrCity } from '../../utils'

class Map extends Component {
  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  async initMap() {
    // 验证百度地图API是否成功引入=》成功会输出百度地图提供的方法对象
    console.log(window.BMap)
    // 解构百度地图API
    const { BMap } = window
    // 1. 创建地图实例
    const map = new BMap.Map('container')
    // 获取定位城市
    const { label, value } = await getCurrCity()
    // 地址解析=》解析经纬度=》Point
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      null,
      (point) => {
        if (point) {
          // 2. 地图初始化,设置地图位置和地图展示级别
          /**
           * 第一参数：地图显示的中心位置
           * 第二个参数：地图缩放级别=》数值越大：地图显示越详细，范围越小 =》数值越小：地图显示范围大，但是显示信息不详细
           */
          map.centerAndZoom(point, 11)
          /**
           * 创建文本覆盖物
           */
          const opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(-120, -60), //设置文本偏移量
          }
          // 创建文本覆盖物的实例
          const label = new BMap.Label(
            '欢迎使用百度地图，这是一个简单的文本标注哦~',
            opts
          )
          // 设置文本覆盖物的样式
          label.setStyle({
            color: 'blue',
            fontSize: '12px',
            height: '20px',
            lineHeight: '20px',
            fontFamily: '微软雅黑',
          })
          //  添加到地图中渲染
          map.addOverlay(label)

          // 添加地图操作控件
          // 地图平移缩放控件
          map.addControl(new BMap.NavigationControl())
          // 比例尺控件
          map.addControl(new BMap.ScaleControl())
          // 缩略图控件
          map.addControl(new BMap.OverviewMapControl())
          // 地图类型（卫星、三维）
          map.addControl(new BMap.MapTypeControl())
          // 添加marker覆盖物
          const marker = new BMap.Marker(point)
          map.addOverlay(marker)
          marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) //跳动的动画
        }
      },
      label
    )
  }

  render() {
    return (
      <div className="mapBox">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>
          地图找房
        </NavBar>
        {/* 地图容器=》渲染百度地图 */}
        <div id="container"></div>
      </div>
    )
  }
}

export default Map
