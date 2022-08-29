import commonRequest from '../'
// import { IQRCode } from './type'
// import { IResponseType } from '../type'

enum testAPI {
  testTest = ''
}

// 正经的评价
// commonRequest.get<IResponseType<IQRCode>>({
//   url: testAPI.testTest,
//   params: {}
// })
export function aaaaa(text: string, size: string) {
  return commonRequest.get<any>({
    url: testAPI.testTest,
    params: {
      text,
      size
    },
    interceptors: {
      requestInterceptors: (config) => {
        console.log('私有的req拦截器')
        return config
      },

      responseInterceptors: (res) => {
        console.log('私有的res拦截器')
        return res
      }
    }
  })
}
