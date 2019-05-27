/**
 * 一个温度曲线的折线图
 *
 * @Author: linhe
 * @Date: 2019-05-22 14:59
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class BrokenItem extends Component {

  static propTypes = {
    dataSource: PropTypes.array,
    leftRightPadding: PropTypes.number,
    topBottomPadding: PropTypes.number,
    mWidth: PropTypes.number,
    mHeight: PropTypes.number,
    textDown: PropTypes.bool,
    strokeWidth: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.mTemperature = this.props.dataSource;
    this.mWidth = this.props.mWidth;
    this.mHeight = this.props.mHeight;
    this.strokeWidth = this.props.strokeWidth;
    this.leftRightPadding = this.props.leftRightPadding;
    this.topBottomPadding = this.props.topBottomPadding;
    this.textDown = this.props.textDown;

    this._chooseMaxMinTemperature();
    this._getWidthHeight();
    this._getDrawPath();
  }

  render() {
    return (
      <div style={{marginTop: this.textDown ? 0 : 20, marginBottom: this.textDown ? 20 : 0}}>
        <svg height={this.mHeight} width={this.mWidth}>
          {this.largeCircleArray}
          {this.litterCircleArray}
          {this.lineArray}
          {this.textArray}
        </svg>
      </div>
    )
  }

  _getDrawPath() {

    this.lineArray = [];
    this.litterCircleArray = [];
    this.largeCircleArray = [];
    this.textArray = [];

    let x = 0;
    let y = 0;
    let largeRadius = this.strokeWidth * 2;
    let litterRadius = this.strokeWidth * 0.8;
    //首先计算宽高
    for (let i = 0; i < this.mTemperature.length; i++) {
      let nextX = this.leftRightPadding + this.mItemWidth * i;
      let nextY = this.topBottomPadding + this.mItemHeight * (Math.abs(this.mTemperature[i] - this.maxTemperature));
      //画折线
      if (i > 0) {
        this.lineArray.push(
          <line key={i}
                x1={x}
                y1={y}
                x2={nextX}
                y2={nextY}
                stroke={'#3cb775'}
                strokeWidth={this.strokeWidth}/>)
      }
      x = nextX;
      y = nextY;
      //外部透明圆点
      this.largeCircleArray.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={largeRadius}
          fill='#c2e8d4'/>)
      //中间实心圆点
      this.litterCircleArray.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={litterRadius}
          fill={'#3cb775'}/>)
      //文本
      this.textArray.push(
        <text
          key={i}
          fontSize="10"
          fill={'#3cb775'}
          x={x}
          y={this.textDown ? y + 4 * largeRadius : y - this.topBottomPadding + 2 * largeRadius}
          textAnchor="middle">{this.mTemperature[i] + "°"}</text>);
    }
  }

  /**
   * 计算高度
   **/
  _getWidthHeight() {
    this.mItemHeight = ((this.mHeight - this.topBottomPadding * 2)) / (this.maxTemperature - this.minTemperature === 0 ? 1 : this.maxTemperature - this.minTemperature);
    this.mItemWidth = (this.mWidth - this.leftRightPadding * 2) / (this.mTemperature.length - 1);
  }

  /**
   * 选择出最大和最小的温度
   **/
  _chooseMaxMinTemperature() {
    //赋予第一个值为最大或者最小
    this.maxTemperature = this.mTemperature[0];
    this.minTemperature = this.mTemperature[0];
    for (let i = 0; i < this.mTemperature.length; i++) {
      this.maxTemperature = Math.max(this.maxTemperature, this.mTemperature[i]);
      this.minTemperature = Math.min(this.minTemperature, this.mTemperature[i]);
    }
  }
}
