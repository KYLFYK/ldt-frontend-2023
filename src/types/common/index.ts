export type TMedia = {
  createAt: string
  fileName: string
  id: number
  mediaType: string
  mimeType: string
  updateAt: string
}

export type TBaseSagaPayload =
  | {
      errorCallback?: () => void
      successCallback?: () => void
    }
  | undefined
