import BaseError from './baseError'
import { ErrorCode } from './errorCode'

export class FetchBreedError extends BaseError {
  errorCode = ErrorCode.FetchBreedError

  message = 'Failed to get all Breeds'
}
