import { TMedia } from '../common'

type TTree<T> = T & {
  children?: T[]
}

export type TDocNode = {
  files: TMedia[]
  name: string | 'root'
  id: string | number
  children?: TDocNode[]
}

export type TDocuments = TTree<TDocNode>
