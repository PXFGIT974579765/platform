import { evaluate } from 'mathjs'

// yyyy-MM-dd hh:mm:ss
export function curDate(formater = 'yyyy-MM-dd') {
  const format = (date, fmt) => {
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  return format(new Date(), formater)
}

export function calc(express) {
  return evaluate(express)
}

// 把两个时间格式转换成人话   yyyy-MM-dd HH:mm:ss
export function convertDateTime(fromDateTime, toDateTime) {
  const weekDay = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  // 兼容性问题
  fromDateTime = fromDateTime.replace(/-/g, '/')
  toDateTime = toDateTime.replace(/-/g, '/')

  // 日期
  const fromDate = fromDateTime.slice(0, 10)
  const toDate = toDateTime.slice(0, 10)

  // 时间
  const fromTime = fromDateTime.slice(11, 16)
  const toTime = toDateTime.slice(11, 16)

  if (fromDate == toDate) {
    return `${fromDate} ${
      weekDay[new Date(Date.parse(fromDateTime)).getDay()]
    } ${fromTime} 至 ${toTime}`
  }

  return `${fromDate} 至 ${toDate}`
}
