/**
 * aqi 相关信息的控件
 * @Author: linhe
 * @Date: 2019-05-22 16:15
 */
import React from 'react';
import AqiCircleView from './AqiCircleView'
import './AqiView.css'

export default function AqiView({weatherInfo}) {
  const aqiInfo = weatherInfo.aqi
  // 当前 aqi 数据相关的
  let aqi = aqiInfo.aqi;
  if (aqi) {
    aqi = parseInt(aqi);
  } else {
    aqi = 50
  }
  let aqiColor = '#3cb775'
  if (aqi < 100) {
    aqiColor = '#3cb775'
  } else if (aqi < 200) {
    aqiColor = '#c4bf29'
  } else {
    aqiColor = '#333333'
  }
  return (
    <div className='aqi-root'>
      <div className='aqi-view-root'>
        <AqiCircleView width={200} height={200} level={aqi}/>
        <div className='aqi-intro-root'>
          <div style={{fontSize: 15, color: aqiColor}}>{`空气${aqiInfo.quality}`}</div>
          <div style={{color: aqiColor}}>{`AQI:${aqiInfo.aqi || "未知"}`}</div>
        </div>
      </div>

      <div className='aqi-text'>
        <div className='aqi-text-root'>
          <div className='aqi-text-title'>{`PM2.5:${aqiInfo.pm2_5}`}</div>
        </div>
        <div className='aqi-text-root'>
          <div className='aqi-text-title'>{`PM10:${aqiInfo.pm10}`}</div>
        </div>
        <div className='aqi-text-root'>
          <div className='aqi-text-title'>{`SO2:${aqiInfo.so2}`}</div>
        </div>
        <div className='aqi-text-root'>
          <div className='aqi-text-title'>{`No2:${aqiInfo.so2}`}</div>
        </div>
      </div>
    </div>
  )

}