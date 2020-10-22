export interface APIContract {
  requestHeadersContract?: RequestHeadersContract
  localStorageContract?: LocalStorageContract
}

export interface LocalStorageContract {
  [key: string]: string
}

export interface RequestHeadersContract {
  generalHeaders?: { 
    [key: string]: string
  }
}
