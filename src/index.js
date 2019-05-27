import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import MainPage from './Main/MainPage';
import SettingPage from './Setting/SettingPage';
import AboutUsPage from './Aboutus/AboutUsPage'
import ManagerCityPage from './City/ManagerCityPage'
import AddCityPage from './City/AddCityPage'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  // 清除当前的 session ，主要是 menu 使用的
  sessionStorage.clear()
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route path='/SettingPage' component={SettingPage}/>
        <Route path='/AboutUsPage' component={AboutUsPage}/>
        <Route path='/ManagerCityPage' component={ManagerCityPage}/>
        <Route path='/AddCityPage' component={AddCityPage}/>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();