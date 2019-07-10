import moment from 'moment'

export function date(mills, formater = 'YYYY.MM.DD') {
  return moment(mills).format(formater)
}

export function dateTime(mills, formater = 'YYYY.MM.DD hh:mm:ss') {
  return moment(mills).format(formater)
}
