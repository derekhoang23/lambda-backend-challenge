type SubBreeds = string[]

export type AllBreeds = string[]
interface Breeds {
  [key: string]: SubBreeds
}

export interface RandomBreedsRequest {
  message: Breeds
  status: string
}
