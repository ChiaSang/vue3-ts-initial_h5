import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store, { key } from '@/store'
import Vconsole from 'vconsole'
import { getUrlParams, ToastInterface, LoadingInterface } from '@/utils/util'
// import vant from '@/utils/vant'
import '@vant/touch-emulator' // 在桌面端自动将 mouse 事件转换成对应的 touch 事件
import '@/style/style.scss'
import * as dd from 'dingtalk-jsapi'
import * as API_BASE from '@/api/modules/base'

const { code: authCode, isDebug, registId } = getUrlParams(window.location.href) || ''
if (Number(isDebug) === 1 || import.meta.env.VITE_APP_BUILD_TYPE !== 'production') {
  // eslint-disable-next-line no-new
  new Vconsole()
}

let firstVisit = true
router.beforeEach(async (to, from, next) => {
  try {
    console.log('firstVisit', firstVisit)
    if (firstVisit) {
      LoadingInterface.open('firstVisit')
      firstVisit = false
      const { userId, zentaoUserName } = store.state.user
      console.log('beforeEach user :>> ', userId, zentaoUserName)
      try {
        const resGetDingTalkSdkSign = await API_BASE.getDingTalkSdkSign({
          params: {
            url: encodeURIComponent(location.href.split('#')[0])
          }
        })
        store.dispatch('sys/updateAppInfo', resGetDingTalkSdkSign.data?.data)
        await ddReady(resGetDingTalkSdkSign.data?.data)
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        const { code } = await dd.runtime.permission.requestAuthCode({
          corpId: store.state.sys.corpId
        })
        console.log('requestAuthCode :>> ', code)
        const resLogin = await API_BASE.login({ params: { code } })
        localStorage.setItem('accessToken', resLogin?.data?.data)
        const resGetUserAccount = await API_BASE.getUserAccount()
        store.dispatch('user/updateUserInfo', resGetUserAccount.data?.data)
      } catch (error) {
        console.error('beforeEach', error)
      }
      LoadingInterface.close()
    }
    next()
  } catch (error: any) {
    error?.message && ToastInterface(error?.message)
    console.log('登录授权失败', error)
  }
})
router.afterEach((to, from, next) => {
  // 页面切换结束时关闭loading
  // LoadingInterface.close()
  const { title = '' }: any = to.meta || {}
  if (title) {
    window.document.title = title
  }
})
const app = createApp(App)
app.config.globalProperties.$dd = dd
app.use(store, key).use(router).mount('#app')

async function ddReady({
  agentId = '', // 必填，微应用ID
  corpId = '', // 必填，企业ID
  timeStamp = '', // 必填，生成签名的时间戳
  nonceStr = '', // 必填，自定义固定字符串。
  signature = ''
}) {
  return new Promise((resolve, reject) => {
    try {
      const configParams = {
        agentId, // 必填，微应用ID
        corpId, // 必填，企业ID
        timeStamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，自定义固定字符串。
        signature, // 必填，签名
        type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          'runtime.info',
          'biz.contact.complexPicker',
          'biz.contact.choose',
          'device.notification.confirm',
          'device.notification.alert',
          'device.notification.prompt',
          'biz.ding.post',
          'biz.util.openLink'
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      }
      console.log('configParams :>> ', configParams)
      dd.config(configParams)
      dd.ready(function () {
        resolve(true)
      })
      dd.error(function (error: any) {
        console.log('dd.error :>> ', error)
        // reject(error)
      })
      setTimeout(() => {
        reject(new Error('timeout'))
      }, 500)
    } catch (error) {
      console.log('ddReady :>> error', error)
      reject(error)
    }
  })
}
