const notification = "notification"
const update = "update"

// 当前使用的城市数据，最开始默认为为定义的
let cityInfos = undefined;

// 判断 cityInfos 中是否已经包含了改城市信息，并且返回当前的position
export function isCityExits(cityInfo) {
  // 如果当前没有的话，就先获取一遍
  if (cityInfos === undefined) {
    cityInfos = getChooseCity()
  }
  for (let i = 0; i < cityInfos.length; i++) {
    if (cityInfos[i].cityInfo.city_id === cityInfo.city_id) {
      return i
    }
  }
  return -1
}

/**
 * 保存当前城市信息
 * @param cityInfo 城市相关的数据
 * **/
export function saveChooseCity(cityInfo) {
  // 如果当前没有数的话，就先获取一遍
  if (cityInfos === undefined) {
    cityInfos = getChooseCity()
  }
  const saveCityInfo = {
    cityInfo,
    defaultCity: cityInfos.length === 0 // 如果当前没有数据的话就第一个为默认城市
  }
  // 后添加的显示在前面
  cityInfos.splice(0, 0, saveCityInfo)
  localStorage.setItem('cityInfo', JSON.stringify(cityInfos))
}

/**
 * 更新当前城市的天气信息
 * @param cityInfo 城市相关信息
 * @param weatherInfo 天气相关信息
 * **/
export function updateCityWeather(cityInfo, weatherInfo) {
  // 如果当前没有数的话，就先获取一遍
  if (cityInfos === undefined) {
    cityInfos = getChooseCity()
  }
  const position = isCityExits(cityInfo)
  if (position !== -1) {
    cityInfos[position].weatherInfo = weatherInfo
    localStorage.setItem('cityInfo', JSON.stringify(cityInfos))
  }
}

/**
 * 设置当前是否为默认城市
 * @param cityInfo 城市信息
 * **/
export function updateDefaultCity(cityInfo) {
  //如果当前没有数的话，就先获取一遍
  if (cityInfos === undefined) {
    cityInfos = getChooseCity()
  }
  // 先把之前的默认城市设置为false，再把当前的设置为true
  let item
  let actionTimes = 0 //标记次数
  for (let i = 0; i < cityInfos.length; i++) {
    if (actionTimes === 2) {
      break
    }
    item = cityInfos[i]
    if (item.defaultCity) { // 把 true 的设置为false
      item.defaultCity = false
      actionTimes++
      continue
    }
    if (item.cityInfo.city_id === cityInfo.city_id) {
      item.defaultCity = true
      actionTimes++
    }
  }
  localStorage.setItem('cityInfo', JSON.stringify(cityInfos))
}

/**
 * 获取当前保存的信息，所有的数据
 * **/
export function getChooseCity() {
  let str = localStorage.getItem('cityInfo')
  if (str) {
    return JSON.parse(str)
  }
  return []
}

//删除某个城市信息
export function deleteChooseCity(cityInfo) {
  // 如果当前没有数的话，就先获取一遍
  if (cityInfos === undefined) {
    cityInfos = getChooseCity()
  }
  const position = isCityExits(cityInfo)
  if (position !== -1) {
    cityInfos.splice(position, 1)
    localStorage.setItem('cityInfo', JSON.stringify(cityInfos))
  }
}

//保存是否通知的信息
export function saveNotificationState(show) {
  localStorage.setItem(
    notification,
    JSON.stringify(show)
  )
}

//获取是否需要通知的消息
export function getNotificationState() {
  const isShow = localStorage.getItem(notification)
  if (isShow === null) {
    return false
  }
  return JSON.parse(isShow)
}

//保存是是否自动更新的信息
export function saveUpdateState(show) {
  localStorage.setItem(
    update,
    JSON.stringify(show)
  )
}

//获取是否需要自动更新
export function getUpdateState() {
  const isShow = localStorage.getItem(update)
  if (isShow === null) {
    return false
  }
  return JSON.parse(isShow)
}
