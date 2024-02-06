// import $store from '@yu/store'
import yu from '@yu'
import dayjs from 'dayjs'
import { ref } from 'vue'
import validate from '@yu/helper/validate'
// TODO H: 待解决登录
import AuthUtil from '@/sheep/api/member/auth'

// 打开授权弹框
export function showAuthModal(type = 'smsLogin') {
  const modal = yu.$store.useModalStore()
  if (modal.auth !== '') {
    closeAuthModal()
    setTimeout(() => {
      modal.$patch((state) => {
        state.auth = type
      })
    }, 100)
  } else {
    modal.$patch((state) => {
      state.auth = type
    })
  }
}

// 关闭授权弹框
export function closeAuthModal() {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    state.auth = ''
  })
}

// 打开分享弹框
export function showShareModal() {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    state.share = true
  })
}

// 关闭分享弹框
export function closeShareModal() {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    state.share = false
  })
}

// 打开快捷菜单
export function showMenuTools() {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    state.menu = true
  })
}

// 关闭快捷菜单
export function closeMenuTools() {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    state.menu = false
  })
}

// 发送短信验证码  60秒
export function getSmsCode(event, mobile) {
  const modal = yu.$store.useModalStore()
  const lastSendTimer = modal.lastTimer[event]
  if (typeof lastSendTimer === 'undefined') {
    yu.$helper.toast('短信发送事件错误')
    return
  }

  const duration = dayjs().unix() - lastSendTimer
  const canSend = duration >= 60
  if (!canSend) {
    yu.$helper.toast('请稍后再试')
    return
  }
  // 只有 mobile 非空时才校验。因为部分场景（修改密码），不需要输入手机
  if (mobile && !validate.isMobile(mobile)) {
    yu.$helper.toast('手机号码格式不正确')
    return
  }

  // 发送验证码 + 更新上次发送验证码时间
  let scene = -1
  switch (event) {
    case 'resetPassword':
      scene = 4
      break
    case 'changePassword':
      scene = 3
      break
    case 'changeMobile':
      scene = 2
      break
    case 'smsLogin':
      scene = 1
      break
  }
  AuthUtil.sendSmsCode(mobile, scene).then((res) => {
    if (res.code === 0) {
      modal.$patch((state) => {
        state.lastTimer[event] = dayjs().unix()
      })
    }
  })
}

// 获取短信验证码倒计时 -- 60秒
export function getSmsTimer(event, mobile = '') {
  const modal = yu.$store.useModalStore()
  const lastSendTimer = modal.lastTimer[event]

  if (typeof lastSendTimer === 'undefined') {
    yu.$helper.toast('短信发送事件错误')
    return
  }

  const duration = ref(dayjs().unix() - lastSendTimer - 60)
  const canSend = duration.value >= 0

  if (canSend) {
    return '获取验证码'
  }

  if (!canSend) {
    setTimeout(() => {
      duration.value++
    }, 1000)
    return -duration.value.toString() + ' 秒'
  }
}

// 记录广告弹框历史
export function saveAdvHistory(adv) {
  const modal = yu.$store.useModalStore()
  modal.$patch((state) => {
    if (!state.advHistory.includes(adv.imgUrl)) {
      state.advHistory.push(adv.imgUrl)
    }
  })
}
