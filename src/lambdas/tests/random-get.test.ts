import fetch, { FetchError } from 'node-fetch'
import { randomGet } from '../controller'
import { mockOne, mockOneResult } from './mock'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('random-get handler', () => {
  it('returns payload from fetch request', async () => {
    mockedFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockOne),
      }),
    )
    const response = await randomGet()
    expect(response).toMatchObject({ body: mockOneResult, statusCode: 200 })
  })

  it('returns status 500 if breed api returns status code >= 400', async () => {
    mockedFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 401,
        json: () => Promise.resolve({ message: 'Unauthorized' }),
      }),
    )
    const response = await randomGet()
    expect(response).toMatchObject({
      message: 'Failed to get all Breeds',
      statusCode: 500,
      errorCode: '00001',
    })
  })

  it('returns status 500 if breed api rejects', async () => {
    mockedFetch.mockReturnValueOnce(Promise.reject(new Error('TIMEOUT')))
    const response = await randomGet()
    expect(response).toMatchObject({
      message: 'General Error occured getting all breeds',
      statusCode: 500,
    })
  })

  it('expect Fetch Error instance with Timeout and message', async () => {
    try {
      mockedFetch.mockRejectedValueOnce(
        Promise.reject(await mockedFetch('https://dog.ceo/api/breeds/list/all', { timeout: 10 })),
      )
      await randomGet()
    } catch (err) {
      expect(err).toBeInstanceOf(FetchError)
      expect(err.message).toEqual('network timeout at: https://dog.ceo/api/breeds/list/all')
    }
  })

  it('expect 500 response on timeout external api call', async() => {
    mockedFetch.mockRejectedValueOnce(new FetchError('network timeout at: https://dog.ceo/api/breeds/list/all', 'request-timeout'))
    const response = await randomGet()
    expect(response).toMatchObject({
      message: 'General Error occured getting all breeds',
      statusCode: 500,
    })
  })
})