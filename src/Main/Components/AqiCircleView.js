/**
 * 中间 aqi 大圆盘的控件
 *
 * @Author: linhe
 * @Date: 2019-05-22 18:16
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class AqiView extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    level: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.width = this.props.width
    this.height = this.props.height
    this.level = this.props.level
    this.topBottomPadding = 15
    this.strokeWidth = 5
    this.halfAngle = 30 //开口的一半
    this.maxLevel = 300  //最大值
    this.radius = (this.height - this.topBottomPadding * 2) / 2;
  }

  render() {
    return (
      <svg width={this.width} height={this.height}>

        <path
          d={this._getBackWedgePath()}
          stroke='#eee'
          fill='none'
          strokeLinecap='round'
          strokeWidth={this.strokeWidth}/>

        <path
          d={this._getFontWedgePath()}
          stroke='url(#grad)'
          strokeLinecap='round'
          fill='none'
          strokeWidth={this.strokeWidth}/>

        <defs>
          <linearGradient id="grad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor='#3CB775'/> {/** 绿色 **/}
            <stop offset="99%" stopColor='#363636'/> {/** 红色 **/}
            <stop offset="100%" stopColor='#8B0000'/> {/** 黑色 **/}
          </linearGradient>
        </defs>

      </svg>
    )
  }

  _getBackWedgePath = () => {
    //角度转化为弧度
    let degress = this.halfAngle * Math.PI / 180;
    //计算起点位置
    let startX = this.width / 2 - this.radius * Math.sin(degress)
    let startY = this.height / 2 + this.radius * Math.cos(degress)
    //计算终点位置，其中30表示一半的开角
    let endX = this.width / 2 + this.radius * Math.sin(degress)
    let endY = this.height / 2 + this.radius * Math.cos(degress)
    return this._getPathString(startX, startY, this.radius, endX, endY, true);
  }

  _getFontWedgePath = () => {
    //确定level的值
    this.level = this.level > this.maxLevel ? this.maxLevel : this.level;
    //计算角度
    let angle = (360 - this.halfAngle * 2) * (this.level / this.maxLevel) + this.halfAngle;
    //计算弧度
    let degree = angle * Math.PI / 180
    //计算起点位置，固定为30度开口的地方
    let startX = this.width / 2 - this.radius * Math.sin(this.halfAngle * Math.PI / 180)
    let startY = this.height / 2 + this.radius * Math.cos(this.halfAngle * Math.PI / 180)
    //计算终点位置,根据角度来计算
    let endX;
    let endY;
    let angleX = Math.abs(this.radius * Math.sin(degree));
    let angleY = Math.abs(this.radius * Math.cos(degree));
    //根据角度范围来计算位置
    if (angle < 90) {
      endX = this.width / 2 - angleX
      endY = this.height / 2 + angleY
    } else if (angle < 180) {
      endX = this.width / 2 - angleX
      endY = this.height / 2 - angleY
    } else if (angle < 270) {
      endX = this.width / 2 + angleX
      endY = this.height / 2 - angleY
    } else {
      endX = this.width / 2 + angleX
      endY = this.height / 2 + angleY
    }
    //总的大于180+halfAngle才表示为大圆弧
    let isBig = (angle > 180 + this.halfAngle);
    return this._getPathString(startX, startY, this.radius, endX, endY, isBig);
  }

  _getPathString = (startX, startY, radius, endX, endY, isBig) => {
    return `M${startX} ${startY} A ${radius} ${radius} 0 ${isBig ? 1 : 0} 1 ${endX} ${endY}`
  }
}