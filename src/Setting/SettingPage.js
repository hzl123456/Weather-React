/**
 * @Author: linhe
 * @Date: 2019-05-14 15:47
 */
import React, {Component} from 'react';
import './SettingPage.css'
import {TitleBar} from '../Element/index'
import {getNotificationState, getUpdateState, saveNotificationState, saveUpdateState} from '../Util/DbHelper'
import Checkbox from 'react-simple-checkbox';

export default class SettingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAutoRefresh: getUpdateState(), // 是否自动更新，默认为false
      isShowNotification: getNotificationState(),// 是否显示通知栏，默认为false
    }
  }

  render() {
    return (
      <div>
        <TitleBar
          leftClick={() => this.props.history.goBack()}
          title="设置"/>

        <SettingItem
          onPress={() => this.onPressCheckBoxState(1)}
          title="自动更新" content="开启可以自动更新天气信息"
          showBox={true}
          isChecked={this.state.isAutoRefresh}/>

        <SettingItem
          title="更新时间间隔" content="1小时"/>

        <SettingItem
          onPress={() => this.onPressCheckBoxState(2)}
          title="通知栏" content="开启通知栏，在通知栏显示天气信息"
          showBox={true}
          isChecked={this.state.isShowNotification}/>

        <SettingItem
          itemDivider={false}
          title="开发者" content="邮箱：mail@hezhilin.cc"/>
      </div>
    )
  }

  /**
   * 保存当前的一个状态相关
   * @param position 1 表示的是自动更新
   *                 2 表示的是通知栏的开关
   * **/
  onPressCheckBoxState = (position) => {
    const {isAutoRefresh, isShowNotification} = this.state
    if (position === 1) {
      const _isAutoRefresh = !isAutoRefresh
      this.setState({isAutoRefresh: _isAutoRefresh})
      saveUpdateState(_isAutoRefresh)
    } else {
      const _isShowNotification = !isShowNotification
      this.setState({isShowNotification: _isShowNotification})
      saveNotificationState(_isShowNotification)
    }
  }
}

function SettingItem({title, content, onPress, showBox = false, isChecked = false, itemDivider = true}) {
  return (
    <div className='list-item' onClick={() => onPress && onPress()}>
      <div className='info-root'>
        <div className='title'>{title}</div>
        <div className='content'>{content}</div>
      </div>
      {showBox ?
        <div className='check-box'>
          <Checkbox
            checked={isChecked}
            borderThickness={1}
            size={3}
            color='#3cb775'/>
        </div> : null}
      {itemDivider ? <div className='divider'/> : null}
    </div>
  )
}
