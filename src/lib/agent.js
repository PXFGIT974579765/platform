// 全局判断是否IOS方法
export function isIos() {
  const u = navigator.userAgent
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1
}
