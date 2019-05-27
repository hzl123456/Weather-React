/**
 * 添加城市列表页面
 *
 * @Author: linhe
 * @Date: 2019-05-17 10:35
 */
import React, {Component} from 'react';
import './AddCityPage.css'
import {TitleBar, AlertDialog, Toast} from "../Element";
import {ListView} from 'antd-mobile';
import {SCREEN_HEIGHT} from '../Util/Constant'
import {StickyContainer, Sticky} from 'react-sticky';
import {saveChooseCity, isCityExits} from '../Util/DbHelper'

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

const ds = new ListView.DataSource({
  getRowData,
  getSectionHeaderData: getSectionData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

export default class AddCityPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
      visible: false, // 是否显示弹窗
      rowData: undefined, // 数据
    };
  }

  componentDidMount() {
    this.getCityInfos()
  }

  async getCityInfos() {
    let data = await require('../Resource/assets/city.json');
    let jsonData = data.data
    let dataBlob = {}
    let sectionIDs = [];
    let rowIDs = [];
    for (let i = 0; i < jsonData.length; i++) {
      rowIDs[i] = [];
      sectionIDs[i] = jsonData[i].title; //标题相关
      for (let j = 0; j < jsonData[i].city.length; j++) {
        const title = i + "_" + j
        dataBlob[title] = jsonData[i].city[j]
        rowIDs[i].push(title)
      }
    }
    // 最后添加右侧标题相关
    for (let i = 0; i < sectionIDs.length; i++) {
      const title = sectionIDs[i]
      dataBlob[title] = title
    }
    let dataSource = ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    this.setState({dataSource})
  }

  render() {
    return (
      <div>
        <TitleBar
          leftClick={() => this.props.history.goBack()}
          title="城市列表"/>
        {this.renderList()}
        {this.renderModal()}
      </div>
    )
  }

  renderModal = () => {
    if (this.state.rowData === undefined) {
      return null
    }
    const rowData = this.state.rowData
    return (
      <AlertDialog
        title={'提示'}
        message={`确定添加 ${rowData.city_child} 的城市信息？`}
        leftPress={() => this.setState({visible: false})}
        rightPress={() => {
          this.setState({visible: false})
          if (isCityExits(rowData) !== -1) {
            Toast.info("当前城市信息已存在", 1800)
          } else {
            saveChooseCity(rowData)
            Toast.info("城市添加成功", 1800)
          }
          // TODO 通知首页进行一些更新的操作
        }}
        visible={this.state.visible}/>
    )
  }

  renderList = () => {
    if (this.state.dataSource === undefined) {
      return null
    }
    return (
      <ListView.IndexedList
        dataSource={this.state.dataSource}
        style={{height: SCREEN_HEIGHT - 56}}
        renderSectionWrapper={sectionID => (
          <StickyContainer
            key={`s_${sectionID}_c`}
            style={{zIndex: 4}}
            className="sticky-container"/>
        )}
        renderSectionHeader={sectionData => (
          <Sticky>
            {() =>
              <div className="sticky-root" style={{zIndex: 4}}>
                <div className="sticky-text">{sectionData}</div>
              </div>}
          </Sticky>
        )}
        quickSearchBarStyle={{
          position: 'absolute',
          top: 100,
          right: 10,
        }}
        showQuickSearchIndicator={true}
        renderBodyComponent={() => <div>{this.props.children}</div>}
        renderRow={this.renderRow}/>
    )
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <div className='item-root' onClick={() => this.onPressAddCity(rowData)}>
        <div className='item-city-child'>{rowData.city_child}</div>
        <div className='item-city-parent'>{rowData.city_parent}</div>
        <div className='item-city-provcn'>{rowData.provcn}</div>
      </div>
    )
  }

  onPressAddCity = (rowData) => {
    this.setState({visible: true, rowData: rowData})
  }
}