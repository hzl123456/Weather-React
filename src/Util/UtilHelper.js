function getWeatherImage(str) {
  //如果是 xx-xx的就取前面那个，如果小雨-中雨
  if (str && str.concat("-")) {
    str = str.split("-")[0];
  }
  switch (str) {
    case "晴":
      return require('../Resource/drawable2x/day0.png');
    case "多云":
      return require('../Resource/drawable2x/day1.png');
    case "阴":
      return require('../Resource/drawable2x/day2.png');
    case "阵雨":
      return require('../Resource/drawable2x/day3.png');
    case "雷阵雨":
      return require('../Resource/drawable2x/day4.png');
    case "小雨":
      return require('../Resource/drawable2x/day6.png');
    case "中雨":
      return require('../Resource/drawable2x/day8.png');
    case "大雨":
      return require('../Resource/drawable2x/day9.png');
    case "暴雨":
      return require('../Resource/drawable2x/day11.png');
    case "雨夹雪":
      return require('../Resource/drawable2x/day13.png');
    case "小雪":
      return require('../Resource/drawable2x/day14.png');
    case "中雪":
      return require('../Resource/drawable2x/day15.png');
    case "大雪":
      return require('../Resource/drawable2x/day17.png');
    case "雾":
      return require('../Resource/drawable2x/day18.png');
    case "霜冻":
      return require('../Resource/drawable2x/day20.png');
    default:
      return require('../Resource/drawable2x/day0.png');
  }
}

export {getWeatherImage}