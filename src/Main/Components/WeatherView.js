/**
 * 天气相关的一个控件
 *
 * @Author: linhe
 * @Date: 2019-05-22 15:57
 */
import React from 'react';
import './WeatherView.css'
import {getWeatherImage} from '../../Util/UtilHelper'

export default function WeatherView({daily}) {
  let array = [];
  for (let i = 0; i < daily.length; i++) {
    array.push(<ItemInfo key={i} item={daily[i]}/>)
  }
  return (
    <div className='weather-root'>
      {array}
    </div>
  )
}

function ItemInfo({item}) {
  return (
    <div className='weather-item-root'>
      <div className='weather-item-text'>{item.week.replace('星期', '周')}</div>
      <img src={getWeatherImage(item.day.weather)}
           alt='图标'
           width={24}
           height={24}/>
    </div>
  )
}
