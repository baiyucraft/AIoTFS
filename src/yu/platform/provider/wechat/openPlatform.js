// 登录
import third from '@/sheep/api/third'
import SocialApi from '@/sheep/api/member/social'

// TODO 芋艿：等后面搞 App 再弄
const socialType = 32 // 社交类型 - 微信开放平台

const load = async() => {}

// 微信开放平台移动应用授权登陆
const login = async() => {
  return uni.login({
    provider: 'weixin',
    onlyAuthorize: true
  }).then(loginRes => {
    if (loginRes.errMsg === 'login:ok') {
      return third.wechat.login({
        platform: 'openPlatform',
        shareInfo: uni.getStorageSync('shareLog') || {},
        payload: encodeURIComponent(
          JSON.stringify({
            code: loginRes.code
          })
        )
      }).then(res => {
        if (res.error === 0) {
          return true
        }
        return false
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: loginRes.errMsg
      })
    }
    return false
  })
}

// 微信 App 解除绑定
const unbind = async(openid) => {
  const { code } = await SocialApi.socialUnbind(socialType, openid)
  return code === 0
}

// 获得社交信息
async function getInfo() {
  const { code, data } = await SocialApi.getSocialUser(socialType)
  if (code !== 0) {
    return undefined
  }
  return data
}

export default {
  load,
  login,
  unbind,
  getInfo
}
