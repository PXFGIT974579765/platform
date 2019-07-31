const prefix = '__platform__'

export default {
  set(key, value) {
    try {
      window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  },

  get(key) {
    const result = window.localStorage.getItem(`${prefix}${key}`)
    if (result) {
      return JSON.parse(result)
    }
    return null
  },

  remove(key) {
    window.localStorage.removeItem(`${prefix}${key}`)
  },
}
