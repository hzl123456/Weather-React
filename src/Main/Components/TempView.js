/**
 * 天气相关的控件
 * @Author: linhe
 * @Date: 2019-05-22 16:15
 */
import React, {useState} from 'react';
import './TempView.css'
import DayTempModalView from './DayTempModalView'
import {getWeatherImage} from '../../Util/UtilHelper'

export default function TempView({weatherInfo}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className='temp-root'>
      <div className='temp-top-root'>
        <div className='temp-top-img-root '>
          <img
            alt={'图标'}
            width={24}
            height={24}
            src={getWeatherImage(weatherInfo.weather)}/>
        </div>
        <div className='temp-top-img-text'>{weatherInfo.weather}</div>
      </div>

      <div onClick={() => setVisible(true)}
           className='temp-top-temp-text'>{weatherInfo.temp}</div>

      <div className='temp-item-root'>

        <div className='temp-item-text-root'>
          <div className='temp-item-text'>{`湿度:${weatherInfo.humidity}`}</div>
        </div>

        <div className='temp-item-text-root'>
          <div className='temp-item-text'>{weatherInfo.winddirect + weatherInfo.windpower}</div>
        </div>

        <div className='temp-item-text-root'>
          <div className='temp-item-text'>{weatherInfo.updatetime.split(" ")[1] + "更新"}</div>
        </div>
      </div>

      <div style={{marginTop: 10, color: '#33b5e5'}}>{weatherInfo.aqi.aqiinfo.affect}</div>

      <DayTempModalView
        onPressClose={() => setVisible(false)}
        visible={visible}
        dataList={weatherInfo.hourly}/>
    </div>
  );
}
