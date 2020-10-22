export interface EPImpl { 
  [key: string]: EpConfig | EPImpl;
}

export interface EpConfig {
  url: string;
  method: string;
  appendPath?: boolean;
  headers?: {
    authorization?: boolean
  }
}

/**
 * @returns EPImpl with given mix of urlName ('user.auth.login')
 */
export function getEpInfo (urlName: string, EP: EPImpl | EpConfig): any {
  if (!urlName) throw new Error('urlName cannot be empty')

  const parts = urlName.split('.')
  if (parts.length <= 1) {
    throw new Error('url is invalid. Please refer to documentation')
  }

  let obj = EP
  let prop
  let _return

  parts.forEach((part, index) => {
    // @ts-ignore
    prop = obj[part]
    if (index === (parts.length - 1) && prop && prop.hasOwnProperty('url')) {
      _return = prop
    }
    obj = prop
  })

  if (_return) return _return
  else throw new Error(`Cannot find epInfo with given url &{url}`)
}
