/**
 * 标题导航栏相关，这里只有左侧按钮，标题内容和右侧按钮
 * @Author: linhe
 * @Date: 2019-05-15 11:31
 */
import React from 'react';
import "./TitleBar.css";

function TitleBar({leftView, leftClick, title, rightView, className}) {
  return (
    <div className={className || 'titlebar-root'}>
      {
        leftView ? leftView :
          <img
            src={require('../Resource/drawable3x/ic_white_back.png')}
            alt={'标题栏左侧回退按钮'}
            onClick={() => leftClick && leftClick()}
            className='titlebar-img'/>
      }
      <div className='titlebar-text'>{title}</div>
      {rightView}
    </div>
  )
}

export default TitleBar
