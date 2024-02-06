import dayjs from 'dayjs'
/**
 * 时间日期转换
 * @param {dayjs.ConfigType} date 当前时间，new Date() 格式
 * @param {string} format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns {string} 返回拼接后的时间字符串
 */
const formatDate = (date, format) => {
  // 日期不存在，则返回空
  if (!date) {
    return ''
  }
  // 日期存在，则进行格式化
  if (format === undefined) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return dayjs(date).format(format)
}

/**
 * 格式化数字
 * @param {string} prefix 前缀
 * @param {'exact' | string} type 格式类型：exact=精确值，其它=大致数量
 * @param {number} num 数值
 * @return {string} 格式化后的字符串
 */
export function formatNum(prefix, type, num) {
  num = (num || 0)
  // 情况一：精确数值
  if (type === 'exact') {
    return prefix + num
  }
  // 情况二：小于等于 10
  if (num < 10) {
    return `${prefix}≤10`
  }
  // 情况三：大于 10，除第一位外，其它位都显示为0
  // 例如：100  - 199  显示为 100+
  //      9000 - 9999 显示为 9000+
  const pow = Math.pow(10, `${num}`.length - 1)
  return `${prefix}${(num / pow) * pow}+`
}

export default {
  formatDate,
  formatNum
}
