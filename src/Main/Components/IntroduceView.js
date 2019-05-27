/**
 * 天气底部的一些介绍展示相关的
 *
 * @Author: linhe
 * @Date: 2019-05-22 14:38
 */
import React from 'react';
import './IntroduceView.css'

const images = [
  require('../../Resource/drawable2x/ic_lifeindex_default.png'),
  require('../../Resource/drawable2x/ic_lifeindex_sport.png'),
  require('../../Resource/drawable2x/ic_lifeindex_default.png'),
  require('../../Resource/drawable2x/ic_lifeindex_default.png'),
  require('../../Resource/drawable2x/ic_lifeindex_carwash.png'),
  require('../../Resource/drawable2x/ic_lifeindex_sport.png'),
  require('../../Resource/drawable2x/ic_lifeindex_dress.png')];
/**
 * @return {null}
 */
export default function IntroduceView({weatherInfo}) {
  if (!weatherInfo) {
    return null
  }
  return (
    <div>
      <IntroduceItem item={weatherInfo.index[0]} showDetail={true} image={images[0]}/>
      <div className='intro-root'>
        <IntroduceItem item={weatherInfo.index[1]} showDetail={false} image={images[1]}/>
        <IntroduceItem item={weatherInfo.index[2]} showDetail={false} image={images[2]}/>
      </div>
      <div className='intro-root'>
        <IntroduceItem item={weatherInfo.index[3]} showDetail={false} image={images[3]}/>
        <IntroduceItem item={weatherInfo.index[4]} showDetail={false} image={images[4]}/>
      </div>
      <div className='intro-root'>
        <IntroduceItem item={weatherInfo.index[5]} showDetail={false} image={images[5]}/>
        <IntroduceItem item={weatherInfo.index[6]} showDetail={false} image={images[6]}/>
      </div>
    </div>
  )
}

function IntroduceItem({item, image, showDetail}) {
  return (
    <div className='intro-item-root'>
      <div className='intro-item-img-root'>
        <img src={image} width={40} height={40} alt={'图标'}/>
      </div>
      <div>
        <div className='intro-item-name'>{item.iname}</div>
        <div className='intro-item-value'>
          {showDetail ? item.detail : item.ivalue}
        </div>
      </div>
    </div>
  )
}