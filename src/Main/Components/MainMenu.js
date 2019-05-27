/**
 * 首页左侧的 menu
 * @Author: linhe
 * @Date: 2019-05-15 16:10
 */
import React, {Component} from 'react';
import './MainMenu.css'
import PropTypes from 'prop-types';
import {MENU_WIDTH, MENU_IMG_HEIGHT, TYPHONE_URL} from '../../Util/Constant'
import {slide as Menu} from 'react-burger-menu'

const MENU_ITEMS = ["全球台风", "添加城市", "管理城市", "设置", "关于"]
const MENU_DRAWABLES = [
  require('../../Resource/drawable2x/ic_typhone.png'),
  require('../../Resource/drawable2x/ic_addcity.png'),
  require('../../Resource/drawable2x/ic_manager_city.png'),
  require('../../Resource/drawable2x/ic_settings.png'),
  require('../../Resource/drawable2x/ic_about.png')];

export default class MainMenu extends Component {

  static propTypes = {
    history: PropTypes.object, // 跳转使用
    locationAddress: PropTypes.string //定位得到的地址
  }

  render() {
    const array = []
    for (let i = 0; i < MENU_ITEMS.length; i++) {
      const position = i
      array.push(
        <MenuItem
          key={`id_${i}`}
          text={MENU_ITEMS[position]}
          icon={MENU_DRAWABLES[position]}
          onPress={() => this._onPressMenuItem(position)}/>
      )
    }
    let isOpen = false
    let openStr = sessionStorage.getItem('isOpen')
    if (openStr) {
      isOpen = JSON.parse(openStr)
    }
    return (
      <Menu isOpen={isOpen} width={MENU_WIDTH}>
        <div className='menu-main'>
          <img
            className='menu-img'
            width={MENU_WIDTH}
            height={MENU_IMG_HEIGHT}
            alt={'菜单的一个图片'}
            src={require('../../Resource/drawable3x/icon_drawer.png')}/>
          <div className='menu-location-root' style={{height: MENU_IMG_HEIGHT - 10}}>
            <img src={require('../../Resource/drawable3x/loc_icon.png')}
                 className='menu-location-img'
                 alt={'定位图标'}/>
            <div className='menu-location-text'>{this.props.locationAddress}</div>
          </div>
          {array}
        </div>
      </Menu>
    )
  }

  _onPressMenuItem = (position) => {
    const {history} = this.props
    sessionStorage.setItem('isOpen', 'true')
    switch (position) {
      case 0: //打开一个外部链接
        window.open(TYPHONE_URL);
        break;
      case 1: //添加城市
        history.push('AddCityPage')
        break;
      case 2: //管理城市
        history.push('ManagerCityPage')
        break;
      case 3: //设置
        history.push('SettingPage')
        break;
      case 4: //关于
        history.push('AboutUsPage')
        break;
      default:
        break
    }
  }
}

function MenuItem({onPress, icon, text}) {
  return (
    <div className='menu-item' onClick={() => onPress && onPress()}>
      <img src={icon} width={18} height={18} alt={'icon'}/>
      <div className='menu-item-text'>{text}</div>
    </div>
  )
}

