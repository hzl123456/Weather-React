/**
 * 关于我们的界面
 * @Author: linhe
 * @Date: 2019-05-16 09:54
 */
import React, {Component} from 'react';
import {TitleBar} from '../Element/index'
import './AboutUsPage.css'

export default class AboutUsPage extends Component {

  render() {
    return (
      <div>
        <TitleBar
          leftClick={() => this.props.history.goBack()}
          title={'关于 Weather'}/>
        <div className='about-us'>
          <img
            className='about-us-logo' alt={'logo'}
            src={require('../Resource/drawable3x/ic_launcher.png')}/>

          <div className='about-us-view'>
            <div className='about-us-text'>当前版本:1.0.4</div>
          </div>

          <div className='about-us-bottom'>
            <div className='about-us-content'>Weather 是仿照一款叫做天气的软件制作的</div>
          </div>
        </div>
      </div>
    )
  }
}