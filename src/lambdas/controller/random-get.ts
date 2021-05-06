import fetch, { Response } from 'node-fetch'
import { flatten } from 'lodash'
import { Controller } from './baseController'
import { RandomBreedsRequest, AllBreeds, ExtendReponse } from '../types'
import { ExternalRequest } from '../types/requestType'

import { FetchBreedError } from '../errors'

class RandomGetController extends Controller implements ExternalRequest {
  randomBreedRequest: RandomBreedsRequest

  async makeRequest(url: string) {
    const res: Response = await fetch(url)
    this.setStatus(res.status)
    if (res.status >= 200 && res.status <= 299) {
      return res
    }
    throw new FetchBreedError()
  }

  async handleRequest(response: Response) {
    this.randomBreedRequest = await response.json()
  }

  flattenAllBreeds() {
    const allBreeds: AllBreeds = flatten(
      Object.entries(this.randomBreedRequest.message).map(([key, value]) => {
        if (value.length) {
          return Object.values(value).map((v) => {
            return `${v} ${key}`
          })
        }
        return key
      }),
    )
    return allBreeds
  }
}

export async function handler(): Promise<ExtendReponse<AllBreeds>> {
  try {
    const requestBreeds = new RandomGetController()
    const response = await requestBreeds.makeRequest('https://dog.ceo/api/breeds/list/all')
    await requestBreeds.handleRequest(response)
    const payload = await requestBreeds.flattenAllBreeds()
    return {
      statusCode: requestBreeds.getStatus(),
      body: payload,
    }
  } catch (err: unknown) {
    if (err instanceof FetchBreedError) {
      return {
        statusCode: 500,
        errorCode: err.errorCode,
        message: err.message,
      }
    }
    return {
      statusCode: 500,
      message: `General Error occured getting all breeds`,
    }
  }
}
