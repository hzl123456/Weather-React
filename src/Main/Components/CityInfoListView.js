/**
 * 展示城市界面信息的页面
 *
 * @Author: linhe
 * @Date: 2019-05-21 15:36
 */
import React, { Component } from 'react'
import './CityInfoListView.css'
import { SCREEN_HEIGHT } from '../../Util/Constant'
import { BASE_URL, API_KEY, SCREEN_WIDTH } from '../../Util/Constant'
import SwipeableViews from 'react-swipeable-views'
import { updateCityWeather } from '../../Util/DbHelper'
import IntroduceView from '../Components/IntroduceView'
import BrokenView from './BrokenView'
import TempView from './TempView'
import AqiView from './AqiView'
import WeatherView from './WeatherView'
import { EventEmitter } from 'events'
import { PULL_TO_REFRESH } from '../../Util/ActionEvent'
import pullToRefresh from '../../Element/PullToRefresh/pullToRefresh'
import ptrAnimatesMaterial from '../../Element/PullToRefresh/styles/material/animates'
import '../../Element/PullToRefresh/styles/material/style.css'
import { getUpdateState, getNotificationState } from '../../Util/DbHelper'

const emitter = new EventEmitter()

export default class CityInfoListView extends Component {

  constructor (props) {
    super(props)
    const {data} = this.props
    this.sessionKey = `container${data.cityInfo.city_id}`
    this.sessionData = this._getSession()
    this.state = {
      data: data // 城市天气相关的一些数据
    }
    this._setAutoRefresh()
  }

  componentDidMount () {
    this._fetchCityWeatherInfo()
    const sessionKey = this.sessionKey
    // 下拉刷新的一个事件
    this.refreshEvent = emitter.addListener(PULL_TO_REFRESH + sessionKey, (resolve) => {
      this._fetchCityWeatherInfo(resolve)
    })
    // 下拉刷新相关的
    pullToRefresh({
      container: document.querySelector(`.container${sessionKey}`),
      scrollable: this.scrollView, // 需要根据它的位置去判断
      animates: ptrAnimatesMaterial,
      refresh() {
        return new Promise(resolve => {
          emitter.emit(PULL_TO_REFRESH + sessionKey, resolve)
        })
      }
    })
    // 滚动到之前的位置
    this.scrollView && this.scrollView.scrollTo({left: 0, top: this.sessionData.location})
  }

  componentWillUnmount () {
    // 移除事件
    emitter.removeListener(this.refreshEvent, () => {
    })
    // 移除定时器
    this.timer && clearInterval(this.timer)
    // 记录一个当前的状态
    this._saveSession()
  }

  /**
   * 如果开启了自动更新，那这里将开启一个定时器去进行定时刷新的操作
   * **/
  _setAutoRefresh = () => {
    const autoRefresh = getUpdateState()
    if (autoRefresh) {
      const time = 60 * 60 * 1000 //默认时间间隔为1小时
      this.timer = setInterval(() => this._fetchCityWeatherInfo(null), time)
    }
  }

  _getSession = () => {
    const sessionStr = sessionStorage.getItem(this.sessionKey)
    let sessionData = { //
      location: 0, // 默认为初始位置
      index: 0,
    }
    if (sessionStr) {
      sessionData = JSON.parse(sessionStr)
    }
    return sessionData
  }

  /**
   * 记录当前的一个状态
   * **/
  _saveSession = () => {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(this.sessionData))
  }

  /**
   * 获取当前城市的信息
   * **/
  _fetchCityWeatherInfo = (resolve) => {
    const {data} = this.state
    const url = `${BASE_URL}?city=${data.cityInfo.city_child}`
    fetch(url, {
      method: 'GET',
      headers: {'apikey': API_KEY},
    }).then((response) => {
      return response.json()
    }).then((responseData) => {
      // 至少1000ms动画效果
      setTimeout(() => resolve && resolve(), 1000)
      if (responseData.status === 0) { //表示数据返回正常
        const weatherInfo = responseData.result
        //更新天气信息
        data.weatherInfo = weatherInfo
        // 判断是否需要显示通知栏，如果是默认城市的话将在通知栏进行展示
        if (data.defaultCity && getNotificationState()) {
          const message = `${weatherInfo.temp}° ${weatherInfo.weather} ${weatherInfo.updatetime.split(' ')[1]}更新`
          this._showNotifation(data.cityInfo.city_child + '天气更新', message)
        }
        //保存信息到数据库中
        updateCityWeather(data.cityInfo, weatherInfo)
        //更新 state 数据
        this.setState({data})
      }
    }).then(() => {
      // 至少1000ms动画效果
      setTimeout(() => resolve && resolve(), 1000)
    })
  }

  render () {
    return (
      <div className={`container${this.sessionKey} pull-to-refresh-material`}>
        <div
          ref={(c) => this.scrollView = c}
          onScroll={() => this._onScrollEvent()}
          className='root' style={{height: SCREEN_HEIGHT - 56}}>
          {this.renderContent()}
        </div>
        <div className="pull-to-refresh-material__control">
          <svg className="pull-to-refresh-material__icon" fill="#3cb775" width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <svg className="pull-to-refresh-material__spinner" width="24" height="24" viewBox="25 25 50 50">
            <circle className="pull-to-refresh-material__path" cx="50" cy="50" r="20" fill="none" stroke="#3cb775" strokeWidth="4" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    )
  }

  _onScrollEvent = () => {
    this.sessionData.location = this.scrollView.scrollTop
  }

  renderContent = () => {
    const {data} = this.state
    const {weatherInfo} = data
    if (!weatherInfo) {
      return null
    }
    return (
      <div>
        <SwipeableViews
          index={this.sessionData.index}
          onChangeIndex={(index) => this.sessionData.index = index}>
          <TempView weatherInfo={weatherInfo}/>
          <AqiView weatherInfo={weatherInfo}/>
        </SwipeableViews>

        <WeatherView daily={weatherInfo.daily}/>

        <BrokenView
          leftRightPadding={25}
          topBottomPadding={18}
          textDown={false}
          mHeight={50}
          mWidth={SCREEN_WIDTH}
          strokeWidth={2}
          dataSource={this._getHighTempDataSource(data)}/>

        <BrokenView
          leftRightPadding={25}
          topBottomPadding={18}
          textDown={true}
          mHeight={50}
          mWidth={SCREEN_WIDTH}
          strokeWidth={2}
          dataSource={this._getLowTempDataSource(data)}/>

        <IntroduceView weatherInfo={weatherInfo}/>
      </div>
    )
  }

  _showNotifation = (title, message) => {
    if (!window.Notification) { // 先判断是否支持通知
      return
    }
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') { // 此时是允许通知的
        // 先移除上一个
        if (this.notification) {
          this.notification.close()
        }
        this.notification = new Notification(title, {
          body: message,
          tag: 'weather',
          icon: require('../../Resource/drawable3x/icon.png'),
          requireInteraction: true,
          renotify: true
        })
      }
    })
  }

  _getHighTempDataSource = (item) => {
    let daily = item.weatherInfo.daily
    let array = []
    let number = daily.length > 7 ? 7 : daily.length
    for (let i = 0; i < number; i++) {
      array.push(Number.parseInt(daily[i].day.temphigh))
    }
    return array
  }

  _getLowTempDataSource = (item) => {
    let daily = item.weatherInfo.daily
    let array = []
    let number = daily.length > 7 ? 7 : daily.length
    for (let i = 0; i < number; i++) {
      array.push(Number.parseInt(daily[i].night.templow))
    }
    return array
  }

}
