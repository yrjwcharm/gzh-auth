/**
 * 全局方法页面
 */
let Methods = {}

/**
 * @method 获取多少天内日期数组
 * @param {number} dateLength 多少天内
 * @returns {Array}
 */
Methods.getDateArr = function (dateLength) {
  console.log('Methods.getDateArr -> dateLength', dateLength)
  let arr = []
  let i = 0
  while (i < dateLength) {
    arr.push(+new Date().setDate(new Date().getDate() + i))
    i++
  }
  return dateLength ? arr : [+new Date]
}

/**
 * @method 日期格式过滤器
 * @param {number} msg 要转换的事件戳
 * @param {string} key 确定类型是时间戳
 * @param {string} type 返回的日期格式
 * @returns {string}
 */
Methods.getDate = (msg, key, type) => {
  if (key != 'date') return msg
  let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let date = new Date(msg)
  // 年
  let year = date.getFullYear()
  // 月
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  // 日
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // 周
  let week = weekArr[date.getDay()]
  // 小时
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  // 分钟
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  // 秒
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  let ma = date.getHours() >12?'下午':'上午'

  // 通过类型返回日期格式
  let dateJson = {
    'YYYY-MM-DD WEEK': year + '-' + month + '-' + day + '   ' + week,
    'YYYY-MM-DD': year + '-' + month + '-' + day,
    'HH:MM': h + ':' + m,
    'YYYY/MM/DD': year + '/' + month + '/' + day,
    'YYYY/MM/DD HH:MM': year + '/' + month + '/' + day+ '  ' + h + ':' + m ,
    'WEEK YYYY-MM-DD': week + '   ' + year + '-' + month + '-' + day,
    'YYYYMMDD': year + '' + month + '' + day,
    'YYYY-MM-DD HH:MM:SS': year + '-' + month + '-' + day + '  ' + h + ':' + m + ':' + s,
    'YYYY-MM-DD MA': year + '-' + month + '-' + day + '  ' + ma, //上下午
  }
  return dateJson[type]
}

/**
 * @method 转换地区格式
 * @param {Array} city 城市数组
 * @returns {json}
 */
Methods.filCity = city => {
  let json = {
    province_list: {},
    city_list: {},
    county_list: {}
  }
  // 市(数组)
  let cityArr = city.map(item => item.children || []).flat()
  cityArr.forEach(item => {
    json.city_list[item.areacode] = item.label
  })
  // 县(数组)
  let county = cityArr.map(item => item.children || []).flat()
  county.forEach(item => {
    json.county_list[item.areacode] = item.label
  })
  json.province_list = toJson(city)
  json.city_list = toJson(cityArr)
  json.county_list = toJson(county)
  return json
}
/**
 * @method 转对象
 * @param {Array} Arr 城市数组
 * @returns {json}
 */
const toJson = Arr => {
  let json = {}
  Arr.forEach(item => {
    json[item.areacode] = item.label
  })
  return json
}

/**
 * @method 身份证号码校验入口方法
 * @param {String} val 身份证号
 * @returns {Boolean}
 */
Methods.checkID = function (val) {
  val += ''
  if (checkCode(val)) {
    let date = val.substring(6, 14)
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true
      }
    }
  }
  return false
}
/**
 * @method 校验码校验
 * @param {String} val 身份证号
 * @returns {Boolean}
 */
let checkCode = function (val) {
  let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  let code = val.substring(17)
  if (p.test(val)) {
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true
    }
  }
  return false
}

/**
 * @method 出生日期校验
 * @param {String} val 身份证号
 * @returns {Boolean}
 */
let checkDate = function (val) {
  let pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(val)) {
    let year = val.substring(0, 4)
    let month = val.substring(4, 6)
    let date = val.substring(6, 8)
    let date2 = new Date(year + '-' + month + '-' + date)
    if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
      return true
    }
  }
  return false
}

/**
 * @method 所在城市校验
 * @param {String} val 身份证号
 * @returns {Boolean}
 */
let checkProv = function (val) {
  let pattern = /^[1-9][0-9]/
  let provs = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门'
  }
  if (pattern.test(val)) {
    if (provs[val]) {
      return true
    }
  }
  return false
}

export default Methods
