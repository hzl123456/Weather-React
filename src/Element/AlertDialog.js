/**
 * 一般来说，包含确定取消的一个弹窗
 *
 * @Author: linhe
 * @Date: 2019-05-21 09:28
 */
import React from 'react'
import { Modal } from 'antd-mobile'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../Util/Constant'
import './AlertDialog.css'

function AlertDialog ({visible, title, message, leftText = '取消', leftPress, rightText = '确定', rightPress}) {
  return (
    <Modal className="modal-root"
           transparent={true}
           transitionName="fade"
           visible={visible}
           popup={true}>
      <div className="alert-root" style={{height: SCREEN_HEIGHT}}>
        <div className='alert-content' style={{width: SCREEN_WIDTH - 60}}>

          {/** 标题 **/}
          {title ? <div className='alert-title'>{title}</div> : null}

          {/** 内容 **/}
          <div className='alert-message'>{message}</div>

          <div className='divder-column' style={{width: SCREEN_WIDTH - 60}}/>

          {/** 确定和取消按钮 **/}
          <div className='alert-text-root'>

            <div className='alert-text-root-view' onClick={() => leftPress && leftPress()}>
              <div className='alert-left-text'>{leftText}</div>
            </div>

            <div className='divder-row'/>

            <div className='alert-text-root-view' onClick={() => rightPress && rightPress()}>
              <div className='alert-right-text'>{rightText}</div>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AlertDialog