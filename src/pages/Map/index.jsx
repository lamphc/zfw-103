import React, { Component } from 'react'
// 导入组件样式
import styles from './index.module.css'
import { NavBar, Icon } from 'antd-mobile'
import { getCurrCity } from '../../utils'
import { getMapDataById } from '../../utils/api/city'
import { getListByFilter } from '../../utils/api/house'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/request'

class Map extends Component {
  state = {
    // 小区房源列表
    list: [],
    // 是否在地图中显示小区房源列表
    isShowList: false,
  }

  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  async initMap() {
    // 验证百度地图API是否成功引入=》成功会输出百度地图提供的方法对象
    console.log(window.BMap)
    // 解构百度地图API
    // 存储到组件this上=》跨方法调用
    this.BMap = window.BMap
    // 1. 创建地图实例
    this.map = new this.BMap.Map('container')
    // 获取定位城市
    const { label: cityName, value } = await getCurrCity()
    // 地址解析=》解析经纬度=》Point
    // 创建地址解析器实例
    const myGeo = new this.BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      null,
      async (point) => {
        if (point) {
          // 2. 地图初始化,设置地图位置和地图展示级别
          /**
           * 第一参数：地图显示的中心位置
           * 第二个参数：地图缩放级别=》数值越大：地图显示越详细，范围越小 =》数值越小：地图显示范围大，但是显示信息不详细
           */
          this.map.centerAndZoom(point, 11)
          // 添加地图操作控件
          // 地图平移缩放控件
          this.map.addControl(new this.BMap.NavigationControl())
          // 比例尺控件
          this.map.addControl(new this.BMap.ScaleControl())
          // 缩略图控件
          this.map.addControl(new this.BMap.OverviewMapControl())
          // 地图类型（卫星、三维）
          this.map.addControl(new this.BMap.MapTypeControl())
          // 添加marker覆盖物
          const marker = new this.BMap.Marker(point)
          this.map.addOverlay(marker)
          // 设置动画
          marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) //跳动的动画

          // 画第一层的圈圈
          this.renderOverlays(value)
        }
      },
      cityName
    )

    // 添加地图移动监控事件
    this.map.addEventListener('movestart', () => {
      const { isShowList } = this.state
      if (isShowList) {
        console.log('地图开始移动了')
        // 地图移动时候=》如果小区列表显示=》关闭
        this.setState({ isShowList: false })
      }
    })
  }

  /**
   * 画圈圈并展示数据
   * @param {*} value 城市ID/区ID/街道ID
   */
  async renderOverlays(value) {
    // 测试：获取地图第一层覆盖物的数据
    const { status, data } = await getMapDataById(value)
    console.log(status, data)
    // 确定当前画的覆盖物的形状和下一层的缩放大小
    const { type, zoom } = this.getTypeAndZoom()
    if (status === 200) {
      /**
       * 根据当前定位城市所有区的数据
       * 1. 遍历所有区的数据=》画圈圈
       * 2. 在圈圈上展示区的待出租房源数据
       */
      data.forEach((item) => {
        // 获取定位城市区的数据
        const {
          coord: { longitude, latitude },
          label: name,
          count,
          // 当前区到ID
          value,
        } = item
        /**
         * 创建文本覆盖物=>根据后台房源数据遍历创建展示房源数据的覆盖物
         */
        // 创建当前区的point点
        const ipoint = new this.BMap.Point(longitude, latitude)
        const opts = {
          position: ipoint, // 指定文本标注所在的地理位置
          offset: new this.BMap.Size(0, 0), //设置文本偏移量
        }
        // 创建文本覆盖物的实例
        const label = new this.BMap.Label(null, opts)
        // 设置文本覆盖物的样式
        label.setStyle({
          // 清除默认样式
          background: 'transparent',
          border: 0,
        })
        // 点击覆盖物的事件处理函数
        let labelCallback
        if (type === 'circle') {
          // 画圈圈
          // 设置html内容（不是jsx）
          label.setContent(`
        <div class="${styles.bubble}">
          <p class="${styles.bubbleName}">${name}</p>
          <p>${count}套</p>
        </div>
         `)
          labelCallback = () => {
            // 进入到当前区的下一层
            /**
             * 1. 清除上一层覆盖物（圈圈）;定位到当前坐标点和放大地图
             * 2. 加载下一层数据=》画圈圈
             */
            this.map.centerAndZoom(ipoint, zoom)
            // 异步执行清除覆盖物
            setTimeout(() => {
              this.map.clearOverlays()
            }, 0)
            // 画下一层覆盖物=》封装
            /**
             * value=》// 当前区到ID
             */
            this.renderOverlays(value)
          }
        } else {
          // 画长方形
          label.setContent(
            `
            <div class="${styles.rect}">
              <span class="${styles.housename}">${name}</span>
              <span class="${styles.housenum}">${count}套</span>
              <i class="${styles.arrow}"></i>
            </div>
            `
          )
          labelCallback = (e) => {
            console.log('在地图中加载当前点击小区的房源列表数据')
            this.handlerHouseList(value)
            //把当前点击小区移动到地图中心点
            this.moveToCenter(e)
          }
        }

        // 添加点击事件
        label.addEventListener('click', labelCallback)
        //  添加到地图中渲染
        this.map.addOverlay(label)
      })
    }
  }

  //把当前点击小区移动到地图中心点
  moveToCenter(e) {
    /**
     * 计算移动距离（x,y）?
     * 1. 获取起点位置
     * 2. 获取中心（终点）位置
     * 3. 终点坐标-起点坐标=（x,y）移动差值
     */
    // console.log(e)
    const [startPos] = e.changedTouches
    // 起点坐标
    let startX = startPos.clientX,
      startY = startPos.clientY
    // 终点坐标
    let endX = window.innerWidth / 2,
      endY = (window.innerHeight - 330) / 2
    // 移动坐标
    let moveX = endX - startX,
      moveY = endY - startY
    // 移动开始位置到终点
    this.map.panBy(moveX, moveY)
  }

  // 确定当前画的覆盖物的形状和下一层的缩放大小
  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 街道   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  /**
   * type 覆盖物的形状
   * zoom 下一层地图的缩放级别
   */
  getTypeAndZoom() {
    let type, zoom
    /**
     * 如何确定？
     * 1. 获取地图的缩放级别
     * 2. 根据当前地图的缩放级别确定范围
     */
    const curZoom = this.map.getZoom()
    console.log('curZoom:', curZoom)
    if (curZoom >= 10 && curZoom < 12) {
      type = 'circle'
      // 第一层：区
      zoom = 13
    } else if (curZoom >= 12 && curZoom < 14) {
      // 第二层：街道
      type = 'circle'
      zoom = 15
    } else if (curZoom >= 14 && curZoom < 16) {
      // 第三层：小区
      type = 'rectangle'
    }
    return { type, zoom }
  }

  async handlerHouseList(id) {
    let {
      status,
      data: { list },
    } = await getListByFilter(id)
    // console.log(status, data)
    if (status === 200) {
      this.setState({
        list,
        isShowList: true,
      })
    }
  }

  // 渲染小区下房屋列表
  renderHouseList = () => {
    return (
      <div
        className={[
          styles.houseList,
          this.state.isShowList ? styles.show : '',
        ].join(' ')}>
        <div className={styles.titleWrap}>
          <h1 className={styles.listTitle}>房屋列表</h1>
          <a className={styles.titleMore} href="/home/house">
            更多房源
          </a>
        </div>

        <div className={styles.houseItems}>
          {/* 房屋结构 */}
          {this.state.list.map((item) => (
            <HouseItem
              onClick={() =>
                this.props.history.push(`/detail/${item.houseCode}`)
              }
              key={item.houseCode}
              src={BASE_URL + item.houseImg}
              title={item.title}
              desc={item.desc}
              tags={item.tags}
              price={item.price}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.mapBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>
          地图找房
        </NavBar>
        {/* 地图容器=》渲染百度地图 */}
        <div id="container"></div>
        {/* 渲染小区列表 */}
        {this.renderHouseList()}
      </div>
    )
  }
}

export default Map
