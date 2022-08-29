import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 此处是拦截器的类型限制
export interface CommonRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  // responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (error: any) => any
}

// 比正常属性的配置多一个拦截器属性
export interface CommonRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CommonRequestInterceptors<T>
}
