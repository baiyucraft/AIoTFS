// 开发环境配置
export const baseUrl = process.env.NODE_ENV === 'development'
  ? import.meta.env.SHOPRO_DEV_BASE_URL
  : import.meta.env.SHOPRO_BASE_URL

export const version = import.meta.env.AIoTFS_VERSION
console.log(`[农业物联预测系统 Agricultural IoT Forecast System ${version}]`)

export const apiPath = import.meta.env.SHOPRO_API_PATH
export const staticUrl = import.meta.env.SHOPRO_STATIC_URL

export default {
  baseUrl,
  apiPath,
  staticUrl
}
