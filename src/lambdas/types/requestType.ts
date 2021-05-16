import { Response } from 'node-fetch'
import { Controller } from '../controller/baseController'
import { ExtendReponse } from '.'

export interface ExternalRequest extends Controller {
  makeRequest(url: string): Promise<Response | Error>
  handleRequest(response: Response): Promise<void | ExtendReponse>
}
