export default {
  day(during) {
    return Math.floor(during / (24 * 60 * 60 * 1000))
  },

  hour(during) {
    return Math.floor((during % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  },

  minute(during) {
    return Math.floor((during % (60 * 60 * 1000)) / (60 * 1000))
  },

  second(during) {
    return Math.floor((during % (60 * 1000)) / 1000)
  },

  padding(string) {
    return String(string).length > 1 ? string : `0${string}`
  },
}
