import { ErrorCode } from './errorCode'

export default abstract class BaseError extends Error {
  abstract errorCode: ErrorCode

  abstract message: string

  originalError?: Error

  constructor(originalError?: Error) {
    super()
    if (originalError) {
      this.originalError = originalError
    }
  }
}
