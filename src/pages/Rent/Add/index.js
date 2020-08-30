import React, { Component } from 'react'

import {
  Flex,
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Modal,
  NavBar,
  Icon,
  Toast
} from 'antd-mobile'

import HousePackage from '../../../components/HousePackage'


import styles from './index.module.css'
import { uploadHouseImg } from '../../../utils/api/house'
import { pubHouse } from '../../../utils/api/user'

const alert = Modal.alert

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

export default class RentAdd extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    const { data } = this.props.location
    // console.log(111, data)
    // 对象不存在=》防止对象不存在，获取属性报错使用：obj?.key
    const comun = { id: data?.id, name: data?.name }

    this.state = {
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id
      community: comun,
      // 价格
      price: '',
      // 面积
      size: '',
      // 房屋类型
      roomType: '',
      // 楼层
      floor: '',
      // 朝向：
      oriented: '',
      // 房屋标题
      title: '',
      // 房屋图片
      houseImg: '',
      // 房屋配套：
      supporting: '',
      // 房屋描述
      description: ''
    }
  }

  // 取消编辑，返回上一页
  onCancel = () => {
    alert('提示', '放弃发布房源?', [
      {
        text: '放弃',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: '继续编辑'
      }
    ])
  }

  // 处理表单的输入和选择=》受控
  handlerInput = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  /**
   * 
   * @param {*} files 选择图片的数据:[]
   * @param {*} type 操作类型：添加或删除
   * @param {*} index 代表删除选择图片的索引
   */
  upload = (files, type, index) => {
    console.log(files, type, index)
    this.setState({ tempSlides: files })
  }

  // 发布房源
  addHouse = async () => {
    // 获取表单数据
    const {
      // 临时图片地址
      tempSlides,
      // 价格
      price,
      // 面积
      size,
      // 房屋类型
      roomType,
      // 楼层
      floor,
      // 朝向：
      oriented,
      // 房屋标题
      title,
      // 房屋配套：
      supporting,
      // 房屋描述
      description,
      community
    } = this.state
    // 边界判断
    if (!title || !size || !price || !tempSlides.length) {
      return Toast.info('房源信息不完整！', 2)
    }

    // 上传房源图片
    /**
     * 1. 获取本地选择的房源图片
     * 2. 把本地房源图片处理成formData格式，调用后台接口上传
     */
    // 房源图片服务器地址
    let houseImg
    const fd = new FormData()
    tempSlides.forEach((item) => fd.append('file', item.file))
    const { status, data } = await uploadHouseImg(fd)
    if (status === 200) {
      // console.log(status, data)
      houseImg = data.join('|')
    } else {
      return Toast.fail('上传失败！')
    }
    // 发布房源
    // 需要传递数据
    // {
    //   "title": "整租 · 豪华小区 精装修出租 小区环境幽静",
    //   "description": "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
    //   "houseImg": "img1|im2|img3",
    //   "oriented": "ORIEN|caa6f80b-b764-c2df",
    //   "supporting": "空调|洗衣机",
    //   "price": "1234",
    //   "roomType": "ROOM|ce2a5daa-811d-2f49",
    //   "size": "123",
    //   "floor": "FLOOR|1",
    //   "community": "AREA|93cbbe43-741d-de54"
    // }
    const houseData = {
      // 价格
      price,
      // 面积
      size,
      // 房屋类型
      roomType,
      // 楼层
      floor,
      // 朝向：
      oriented,
      // 房屋标题
      title,
      // 房屋配套：
      supporting,
      // 房屋描述
      description,
      //  服务器图片地址集合
      houseImg,
      //  小区ID
      community: community.id
    }

    const { status: sta, description: desc } = await pubHouse(houseData)
    if (sta === 200) {
      Toast.success('发布房源成功！', 2, () => {
        // 跳转到房源管理页面
        this.props.history.push('/rent')
      })
    } else {
      Toast.fail(desc)
    }

  }

  render () {
    const Item = List.Item
    const { history } = this.props
    const {
      community,
      price,
      size,
      roomType,
      floor,
      oriented,
      description,
      tempSlides,
      title
    } = this.state

    return (
      <div className={styles.root}>
        <NavBar
          className={styles.navHeader}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.onCancel}
        >
          发布房源
        </NavBar>
        <List
          className={styles.header}
          renderHeader={() => '基本信息'}
          data-role="rent-list"
        >
          {/* 选择所在小区 */}
          <Item
            extra={community.name || '请选择小区名称'}
            arrow="horizontal"
            onClick={() => history.replace('/rent/search')}
          >
            小区名称
          </Item>
          <InputItem placeholder="请输入租金/月" extra="￥/月" type="number" value={price} onChange={(v) => this.handlerInput('price', v)}>
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem placeholder="请输入建筑面积" extra="㎡" type="number" value={size} onChange={(v) => this.handlerInput('size', v)}>
            建筑面积
          </InputItem>
          <Picker data={roomTypeData} value={[roomType]} onChange={(v) => this.handlerInput('roomType', v[0])} cols={1}>
            <Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </Item>
          </Picker>

          <Picker data={floorData} value={[floor]} onChange={(v) => this.handlerInput('floor', v[0])} cols={1}>
            <Item arrow="horizontal">所在楼层</Item>
          </Picker>
          <Picker data={orientedData} value={[oriented]} onChange={(v) => this.handlerInput('oriented', v[0])} cols={1}>
            <Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </Item>
          </Picker>
        </List>

        <List
          className={styles.title}
          renderHeader={() => '房屋标题'}
          data-role="rent-list"
        >
          <InputItem
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            value={title}
            onChange={(v) => this.handlerInput('title', v)}
          />
        </List>

        <List
          className={styles.pics}
          renderHeader={() => '房屋图像'}
          data-role="rent-list"
        >
          <ImagePicker
            files={tempSlides}
            onChange={this.upload}
            // 多选
            multiple={true}
            // 格式限定
            accept="image/jpg,image/png"
            className={styles.imgpicker}
          />
        </List>

        <List
          className={styles.supporting}
          renderHeader={() => '房屋配置'}
          data-role="rent-list"
        >
          <HousePackage select onSelect={(seled) => {
            console.log('当前选中的配套：', seled)
            // 将数组处理成后台要求的字符串格式
            this.setState({
              supporting: seled.join('|')
            })
          }} />
        </List>

        <List
          className={styles.desc}
          renderHeader={() => '房屋描述'}
          data-role="rent-list"
        >
          <TextareaItem
            rows={5}
            placeholder="请输入房屋描述信息"
            autoHeight
            value={description}
            onChange={(v) => this.handlerInput('description', v)}
          />
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            取消
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
