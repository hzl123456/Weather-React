/**
 * @Author: linhe
 * @Date: 2019-05-27 12:24
 */
import React from 'react';
import MainPage from './Main/MainPage';
import SettingPage from './Setting/SettingPage';
import AboutUsPage from './Aboutus/AboutUsPage'
import ManagerCityPage from './City/ManagerCityPage'
import AddCityPage from './City/AddCityPage'
import {HashRouter, Switch, Route} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';

export default function App() {
  // 清除当前的 session ，主要是 menu 使用的
  sessionStorage.clear()
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route path='/SettingPage' component={SettingPage}/>
        <Route path='/AboutUsPage' component={AboutUsPage}/>
        <Route path='/ManagerCityPage' component={ManagerCityPage}/>
        <Route path='/AddCityPage' component={AddCityPage}/>
      </Switch>
    </HashRouter>
  )
}