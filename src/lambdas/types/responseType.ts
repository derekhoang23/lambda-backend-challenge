// types specific to function handlers
export interface ExtendReponse<T = void> {
  statusCode: number
  message?: string
  errorCode?: string
  body?: T
}
