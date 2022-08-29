import CommonRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const commonRequest = new CommonRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const cookie = localCache.getCache('cookie')

      // 用于判断登陆状态
      if (cookie) {
        console.log('当前登录状态正常')
      }

      return config
    },

    requestInterceptorsCatch: (err) => {
      return err
    },

    responseInterceptors: (res) => {
      return res
    },

    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})

export default commonRequest
