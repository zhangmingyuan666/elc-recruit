import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { CommonRequestConfig, CommonRequestInterceptors } from './type'

class CommonRequest {
  instance: AxiosInstance
  interceptors?: CommonRequestInterceptors //拦截器是可选属性

  constructor(config: CommonRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 默认请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('默认request拦截器拦截成功')

        return config
      },
      (err) => {
        console.log('默认request拦截器拦截失败', err)
        return err
      }
    )

    // 默认接收拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('默认response拦截器拦截成功')

        // 如果有data属性都返回data属性，否则返回所有
        return res.data ?? res
      },
      (err) => {
        console.log('默认response拦截器拦截失败', err)
        return err
      }
    )
  }

  request<T>(config: CommonRequestConfig<T>): Promise<T> {
    // 泛型用于约束返回类型
    return new Promise((resolve, reject) => {
      // 如果当前组件有自定义的请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          // 如果当前组件有自定义的响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }

          // 返回响应结果
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  get<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  put<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default CommonRequest
