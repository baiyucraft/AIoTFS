import { defineStore } from 'pinia'
import $platform from '@yu/platform'
import $router from '@yu/router'
import $store from '.'
import { ref } from 'vue'

const useAppStore = defineStore(
  'app',
  () => {
  // state
    const info = ref({
    // 应用信息
      name: '农业物联预测系统', // 名称
      enName: 'Agricultural IoT Forecast System(AIoTFS)', // 英文名称
      logo: 'https://static.iocoder.cn/ruoyi-vue-pro-logo.png', // logo
      version: '0.0.1', // 版本号
      copytime: '2023-2024', // 版权信息 II
      cdnurl: 'http://192.168.1.164:1111', // 云存储域名
      filesystem: 'qcloud', // 云存储平台
      indexPage: '/pages/index/index'
    })
    const platform = ref({
      share: {
        methods: ['poster', 'link'], // 支持的分享方式
        linkAddress: 'https://shopro.sheepjs.com/#/', // 复制链接地址
        forwardInfo: {}, // 默认转发信息
        posterInfo: {
          user_bg: '/static/img/shop/config/user-poster-bg.png',
          goods_bg: '/static/img/shop/config/goods-poster-bg.png',
          groupon_bg: '/static/img/shop/config/groupon-poster-bg.png'
        } // 海报信息
      },
      bind_mobile: 0 // 登陆后绑定手机号提醒 (弱提醒，可手动关闭)
    })
    const chat = ref({
      chat_domain: 'https://api.shopro.sheepjs.com/chat',
      room_id: 'admin'
    })
    const tabbar = ref({
      items: [
        {
          text: '首页',
          url: '/pages/index/index',
          iconUrl: '/static/icon/home.png',
          activeIconUrl: '/static/icon/home-act.png'
        },
        {
          text: '模型',
          url: '/pages/model/index/index',
          iconUrl: '/static/icon/model.png',
          activeIconUrl: '/static/icon/model-act.png'
        },
        {
          text: '我的',
          url: '/pages/index/user',
          iconUrl: '/static/icon/user.png',
          activeIconUrl: '/static/icon/user-act.png'
        }
      ],
      style: {
        color: '#8C8C8C',
        activeColor: '#2aae67',
        bgColor: '#FFFFFF'
      }
    })
    const basic = ref({
      theme: 'green'
    })
    const template = ref({
      basic: {
        theme: 'green'
      },
      user: {
        data: [
          {
            type: 'userCard',
            style: {
              marginLeft: 0,
              marginRight: 0,
              marginTop: 70,
              marginBottom: 10,
              borderRadiusTop: 0,
              borderRadiusBottom: 0,
              background: {
                type: 'color',
                bgImage: '',
                bgColor: ''
              }
            }
          },
          {
            type: 'orderCard',
            style: {
              background: {
                type: 'color',
                bgImage: '',
                bgColor: '#FFFFFF'
              },
              marginLeft: 10,
              marginRight: 10,
              marginTop: 0,
              marginBottom: 8,
              borderRadiusTop: 8,
              borderRadiusBottom: 8,
              padding: 0
            }
          },
          {
            type: 'couponCard',
            style: {
              background: {
                type: 'color',
                bgImage: '',
                bgColor: '#FFFFFF'
              },
              marginLeft: 10,
              marginRight: 10,
              marginTop: 0,
              marginBottom: 8,
              borderRadiusTop: 8,
              borderRadiusBottom: 8,
              padding: 0
            }
          },
          {
            type: 'walletCard',
            style: {
              background: {
                type: 'color',
                bgImage: '',
                bgColor: '#FFFFFF'
              },
              marginLeft: 10,
              marginRight: 10,
              marginTop: 0,
              marginBottom: 8,
              borderRadiusTop: 8,
              borderRadiusBottom: 8,
              padding: 0
            }
          },
          {
            type: 'menuGrid',
            data: {
              col: 4,
              list: [
                {
                  src: '\/storage\/decorate\/20221115\/9ff8442f8cda57f88aac61059d7d3f21.png',
                  title: {
                    text: '签到',
                    color: '#333333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/app\/sign',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/29559cc94ff33b1f39f570c5f7bc37c1.png',
                  title: {
                    text: '充值',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/pay\/recharge',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/5cb05c3cb99058ad38477205f9ecdcbb.png',
                  title: {
                    text: '提现',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/pay\/withdraw',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/9464fe770d388c7982df73b2d1b1d457.png',
                  title: {
                    text: '设置',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/public\/setting',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/ac3bdfced7c4c5f17f03b48f6d3fa3ec.png',
                  title: {
                    text: '收藏',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/user\/goods-collect',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/94eb324f16b6b48e65c4ea1cf7d3c1fd.png',
                  title: {
                    text: '浏览足迹',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/user\/goods-log',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/215f0aa658e271b3018f2d421bea694f.png',
                  title: {
                    text: '意见反馈',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/public\/feedback',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/408f106f7e8d709156a45b6a96ea6d9c.png',
                  title: {
                    text: '分销中心',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/commission\/index',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/d49bc66b70c240bfa399f9f414bdbefa.png',
                  title: {
                    text: '拼团订单',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/activity\/groupon\/order',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/0c37315a83f9424a4717ef684984c9c0.png',
                  title: {
                    text: '常见问题',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/public\/faq',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/58fe6c2a400d6d18a43949f3d8c58021.png',
                  title: {
                    text: '积分商城',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/app\/score-shop',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/6d0a8c85ba41464b5493226c91c72459.png',
                  title: {
                    text: '关于我们',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/public\/richtext?id=3',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/92bf692d57b8fc2e76815ce6627ef1f9.png',
                  title: {
                    text: '隐私协议',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/public\/richtext?id=2',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/26dff8fb21473e219c6f024fc6a5e39a.png',
                  title: {
                    text: '收货地址',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/user\/address\/list',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/fd5379d520a4a31a8e58b64da3a8790d.png',
                  title: {
                    text: '发票管理',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/user\/invoice\/list',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                },
                {
                  src: '\/storage\/decorate\/20221115\/3c7eb06563d1cf28b4b34bb0d1647659.png',
                  title: {
                    text: '联系客服',
                    color: '#333'
                  },
                  tip: {
                    text: '',
                    color: '#bbb'
                  },
                  url: '\/pages\/chat\/index',
                  badge: {
                    show: 0,
                    text: '',
                    color: '#FFFFFF',
                    bgColor: '#FF6000'
                  }
                }
              ]
            },
            style: {
              background: {
                type: 'color',
                bgImage: '',
                bgColor: '#FFFFFF'
              },
              marginLeft: 10,
              marginRight: 10,
              marginTop: 0,
              marginBottom: 10,
              borderRadiusTop: 8,
              borderRadiusBottom: 8,
              padding: 0
            }
          }
        ],
        style: {
          background: {
            color: '#F6F6F6',
            src: '\/storage\/decorate\/20221115\/b530150a466c8cda0a4cd5b29e2c8d11.png'
          },
          navbar: {
            mode: 'inner',
            alwaysShow: 1,
            type: 'image',
            color: '',
            src: '\/storage\/decorate\/20221115\/283592b4d4f74d84b530035fa7265d73.png',
            list: {
              mp: [
                {
                  width: 1,
                  height: 1,
                  top: 0,
                  left: 0,
                  type: 'image',
                  text: '',
                  textColor: '#111111',
                  src: '\/storage\/decorate\/20221115\/c47b048175b325b1e78f837a3b696794.png',
                  url: '\/pages\/chat\/index',
                  placeholder: '',
                  borderRadius: 0
                },
                {
                  width: 1,
                  height: 1,
                  top: 0,
                  left: 1,
                  type: 'image',
                  text: '',
                  textColor: '#111111',
                  src: '\/storage\/decorate\/20221115\/f09ef51624e48d7d8c58cd602110c46e.png',
                  url: '\/pages\/commission\/goods',
                  placeholder: '',
                  borderRadius: 0
                }
              ],
              app: [
                {
                  width: 1,
                  height: 1,
                  top: 0,
                  left: 0,
                  type: 'image',
                  text: '',
                  textColor: '#111111',
                  src: '\/storage\/decorate\/20221115\/c47b048175b325b1e78f837a3b696794.png',
                  url: '\/pages\/chat\/index',
                  placeholder: '',
                  borderRadius: 0
                },
                {
                  width: 1,
                  height: 1,
                  top: 0,
                  left: 1,
                  type: 'image',
                  text: '',
                  textColor: '#111111',
                  src: '\/storage\/decorate\/20221115\/f09ef51624e48d7d8c58cd602110c46e.png',
                  url: '\/pages\/commission\/goods',
                  placeholder: '',
                  borderRadius: 0
                }
              ]
            }
          }
        }
      }
    })
    const shareInfo = ref({}) // 全局分享信息
    const has_wechat_trade_managed = ref(0) // 小程序发货信息管理  0 没有 || 1 有

    // getters

    // actions
    const init = async(templateId = null) => {
      // 检查网络
      const networkStatus = await $platform.checkNetwork()
      if (!networkStatus) {
        $router.error('NetworkError')
      }

      // 加载主题
      const sysStore = $store.useSysStore()
      sysStore.setTheme()

      // 模拟用户登录
      const userStore = $store.useUserStore()
      if (userStore.isLogin) {
        userStore.loginAfter()
      }
      return Promise.resolve(true)
    }

    return {
      info,
      platform,
      chat,
      tabbar,
      basic,
      template,
      shareInfo,
      has_wechat_trade_managed,
      init
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{
        key: 'app-store'
      }]
    }
  }
)

export default useAppStore
