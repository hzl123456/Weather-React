/**
 * 一天天气的一个弹窗展示
 *
 * @Author: linhe
 * @Date: 2019-05-22 10:19
 */
import React from 'react'
import './DayTempModalView.css'
import { ListView, Modal } from 'antd-mobile'
import { SCREEN_HEIGHT } from '../../Util/Constant'
import { getWeatherImage } from '../../Util/UtilHelper'

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

/**
 * @return {null}
 */
export default function DayTempModalView ({visible, dataList, onPressClose}) {
  if (!visible) {
    return null
  }
  return (
    <Modal className='day-temp'
           visible={visible}
           transparent={true}
           popup={true}
           animationType={'slide-up'}>
      <div style={{height: 200}} onClick={() => onPressClose && onPressClose()}/>
      <ListView
        style={{height: SCREEN_HEIGHT - 200}}
        initialListSize={dataList.length}
        dataSource={ds.cloneWithRows(dataList)}
        renderRow={(rowData, sectionID, rowID) => <ListItem rowData={rowData} rowId={rowID}/>}/>
    </Modal>
  )
}

function ListItem ({rowData, rowId}) {
  return (
    <div className='temp-item-root'>
      <div className='temp-item-child-root'>
        <div className='temp-item-child-text'>{_getWeatherTime(rowData, parseInt(rowId))}</div>
      </div>

      <div className='temp-item-child-root'>
        <div className='temp-item-child-text'>{rowData.temp + '°'}</div>
      </div>

      <div className='temp-item-child-root'>
        <img alt={'天气图标'} className='temp-item-child-img' src={getWeatherImage(rowData.weather)}/>
        <div className='temp-item-child-text' style={{marginLeft: 5}}> {rowData.weather}</div>
      </div>
    </div>
  )

  function _getWeatherTime (rowData, position) {
    let time = rowData.time.split(':')[0]
    //当不是第一项的时候，而且为0，那么就表示是第二天了
    if (position !== 0 && time === '0') {
      time = '明日' + time + '时'
    } else {
      time += '时'
    }
    return time
  }
}






