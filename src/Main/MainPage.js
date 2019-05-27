/**
 * @Author: linhe
 * @Date: 2019-05-14 15:42
 */
import React, {Component} from 'react';
import './MainPage.css'
import {TitleBar} from '../Element/index'
import MainMenu from './Components/MainMenu'
import {withRouter} from 'react-router-dom';
import {getChooseCity, saveChooseCity} from "../Util/DbHelper"
import SwipeableViews from 'react-swipeable-views';
import CityInfoListView from './Components/CityInfoListView'
import {GAODE_LOCATION_KEY} from "../Util/Constant";

const SESSION_KEY = 'MainPage' //一个缓存数据的保存

class MainPage extends Component {

  constructor(props) {
    super(props)
    const data = getChooseCity()
    this.sessionData = this._getSession(data)
    this.state = {
      dataList: data,
      locationAddress: this.sessionData.locationAddress, // 定位地址
      titleName: data.length === 0 ? '首页' : data[this.sessionData.index].cityInfo.city_child, // 默认为首页，当切换到城市的时候就采用城市的名称
    }
  }

  /**
   * 保存的数据相关
   * **/
  _saveSession = () => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(this.sessionData))
  }

  /**
   * 城市相关的信息，这里涉及到一个添加和删除等等
   * @param data 城市相关信息
   * **/
  _getSession = (data) => {
    const sessionStr = sessionStorage.getItem(SESSION_KEY)
    let sessionData = { //
      locationAddress: '未知',
      index: 0,
    }
    if (sessionStr) {
      sessionData = JSON.parse(sessionStr)
      if (sessionData.index > data.length - 1) { // 防止删除产生的问题
        sessionData.index = 0
      }
    }
    return sessionData
  }

  componentDidMount() {
    this._getLocation()
  }

  componentWillUnmount() {
    this._saveSession()
  }

  render() {
    return (
      <div>
        <TitleBar
          leftView={
            <img
              src={require('../Resource/drawable3x/ic_menu.png')}
              alt={'首页按钮'}
              className='main-left-img'/>
          }
          rightView={
            <img
              src={require('../Resource/drawable3x/share_icon.png')}
              alt={'首页按钮'}
              className='main-right-img'/>
          }
          title={this.state.titleName}/>
        <MainMenu history={this.props.history} locationAddress={this.state.locationAddress}/>
        <SwipeableViews
          index={this.sessionData.index}
          onChangeIndex={(index) => this._changeTitleName(index)}>
          {this._getCityInfoListView()}
        </SwipeableViews>
      </div>
    )
  }

  // 进行定位的操作
  _getLocation = () => {
    const url = `https://restapi.amap.com/v3/ip?key=${GAODE_LOCATION_KEY}`
    fetch(url).then((response) => {
      return response.json()
    }).then((responseData) => {
      if (responseData) {
        const locationAddress = responseData.province + responseData.city
        this.sessionData.locationAddress = locationAddress //记录当前定位相关
        this.setState({locationAddress})
        //  当列表数据为空的时候，默认给个定位城市
        if (this.state.dataList.length === 0) {
          this._addLocationCity(responseData.city)
        }
      }
    })
  }

  /**
   * 添加当前定位相关的城市
   * @param cityName 城市名称
   * **/
  async _addLocationCity(cityName) {
    const city_child = cityName.substring(0, cityName.length - 1)
    // 不存在，那就需要去进行添加了
    const data = await require('../Resource/assets/city.json');
    const jsonData = data.data
    let rowData
    for (let i = 0; i < jsonData.length; i++) {
      for (let j = 0; j < jsonData[i].city.length; j++) {
        rowData = jsonData[i].city[j]
        if (rowData.city_child === city_child) { // 匹配到了
          // 然后进行添加的操作
          saveChooseCity(rowData)
          // 刷新当前界面
          window.location.reload()
        }
      }
    }
  }

  _changeTitleName = (index) => {
    this.sessionData.index = index //记录当前位置相关
    this.setState({titleName: this.state.dataList[index].cityInfo.city_child})
  }

  _getCityInfoListView = () => {
    let array = []
    const {dataList} = this.state
    for (let i = 0; i < dataList.length; i++) {
      array.push(<CityInfoListView key={`id_${i}`} data={dataList[i]}/>)
    }
    return array
  }
}

export default withRouter(MainPage);
