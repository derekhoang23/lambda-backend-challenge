import { Headers } from 'node-fetch'

export class Controller {
  private statusCode: number

  private headers: Headers

  setStatus(statusCode: number): void {
    this.statusCode = statusCode
  }

  getStatus(): number {
    return this.statusCode
  }

  setheader(name: string, value: string): void {
    this.headers.set(name, value)
  }

  getHeader(name: string): string | string[] | null | undefined {
    return this.headers.get(name)
  }

  getHeaders(): IterableIterator<[string]> {
    return this.headers.values()
  }
}
