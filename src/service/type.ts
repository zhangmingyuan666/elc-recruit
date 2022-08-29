export interface IResponseType<T = any> {
  code: number
  message: string
  data: T
}
