/**
 * 管理城市相关
 * @Author: linhe
 * @Date: 2019-05-17 10:32
 */
import React, { Component } from 'react'
import { TitleBar, AlertDialog, Toast } from '../Element'
import './ManagerCityPage.css'
import { ListView } from 'antd-mobile'
import { SCREEN_HEIGHT } from '../Util/Constant'
import { getChooseCity, updateDefaultCity, deleteChooseCity } from '../Util/DbHelper'

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

export default class ManagerCityPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      data: getChooseCity(), // 当前管理的城市信息
      modalType: 1,// 1 表示删除，2 表示设置默认城市
      visible: false,
      rowData: undefined
    }
    // 当前列表是否在滚动
    this.isScrolling = false
  }

  componentDidMount () {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  render () {
    return (
      <div>
        <TitleBar
          leftClick={() => this.props.history.goBack()}
          title="管理城市"/>

        <ListView
          style={{height: SCREEN_HEIGHT - 56}}
          dataSource={ds.cloneWithRows(this.state.data)}
          onScroll={(e) => {
            this.isScrolling = true
            // 50 ms后就设置为非滚动的状态
            this.scrollTimer && clearTimeout(this.scrollTimer)
            this.scrollTimer = setTimeout(() => this.isScrolling = false, 50)
          }}
          renderBodyComponent={() => <div>{this.props.children}</div>}
          renderRow={this.renderRow}/>

        {this.renderModal()}
      </div>
    )
  }

  renderModal = () => {
    if (this.state.rowData === undefined) {
      return null
    }
    const {rowData, modalType} = this.state
    let message
    if (modalType === 1) {
      message = `确定删除 ${rowData.cityInfo.city_child} 的城市信息？`
    } else {
      message = `确定设置 ${rowData.cityInfo.city_child} 为当前城市？`
    }
    return (
      <AlertDialog
        title={'提示'}
        message={message}
        leftPress={() => this.setState({visible: false})}
        rightPress={() => {
          this.setState({visible: false})
          if (modalType === 1) {
            if (rowData.defaultCity) { // 当前城市不能被删除
              Toast.info('设置为当前城市的无法删除', 1800)
            } else { // 删除当前信息
              deleteChooseCity(rowData.cityInfo)
              this.setState({data: getChooseCity()}, () => {
                Toast.info('删除成功', 1800)
              })
            }
          } else {
            if (rowData.defaultCity) { // 已经设置为当前城市了
              Toast.info('已经设置为当前城市了', 1800)
            } else {
              updateDefaultCity(rowData.cityInfo)
              this.setState({data: getChooseCity()}, () => {
                Toast.info('设置当前城市成功', 1800)
              })
            }
          }
        }}
        visible={this.state.visible}/>
    )
  }

  renderRow = (rowData, sectionID, rowID) => {
    let startTime
    return (
      <div
        onTouchStart={() => {
          startTime = new Date()
        }}
        onTouchEnd={() => {
          if (this.isScrolling) { //列表滚动的时候不进行计算
            return
          }
          const time = new Date() - startTime
          if (time > 500) { // 500ms 以上表示长按事件
            this._deleteCityInfo(rowData)
          } else { //表示单击事件
            this._saveDefaultCity(rowData)
          }
        }}
        className='item-root-city'>
        <div className='item-root-title'>
          <div className='item-root-title-text'>{rowData.cityInfo.city_child}</div>
          <div className='item-root-title-text-content'>{rowData.defaultCity ? '(当前城市)' : ''}</div>
        </div>

        <div className='item-root-content'>
          <div className='item-root-title-text'>{rowData.weatherInfo ? rowData.weatherInfo.temp + '°' : ''}</div>
          <div className='item-root-content-text'>{rowData.weatherInfo ? rowData.weatherInfo.weather : ''}</div>
        </div>
      </div>
    )
  }

  // 删除当前城市信息
  _deleteCityInfo = (rowData) => {
    this.setState({rowData, modalType: 1, visible: true})
  }

  // 设置为当前城市
  _saveDefaultCity = (rowData) => {
    this.setState({rowData, modalType: 2, visible: true})
  }
}