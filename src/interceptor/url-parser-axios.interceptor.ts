import { EPImpl, getEpInfo } from "../ep";
import { AxiosInstance, AxiosRequestConfig } from "axios"
import {APIContract} from "../api-contracts";

declare interface AxiosRequestConfigExt extends AxiosRequestConfig {
  append?: {
    appendPath?: string
  }
}

export default function (EP: EPImpl, contracts: APIContract, options?: { authorizationSnippet?: (headers: any) => Promise<any> }) {
  return (axios: AxiosInstance) => {
    axios.interceptors.request.use(
      async function (config: AxiosRequestConfigExt) {
        if (!config.url) throw new Error('config.url is undefined')
        if (!config.method) throw new Error('No method was defined')
        let epInfo = getEpInfo(config.url, EP)

        if (epInfo.appendPath === true && (!config.append || !config.append.appendPath)) {
          throw new Error('appendPath is true but config appendPath is not defined!')
        }

        config.url = epInfo.url + ((epInfo.appendPath === true) ? config?.append?.appendPath : '')
        config.method = epInfo.method
        config.headers = {
          ...contracts.requestHeadersContract?.generalHeaders,
          ...config.headers
        }

        // assign authorization
        if (epInfo.headers && epInfo.headers.authorization) {
          if (options && options.authorizationSnippet) {
            try {
              await options.authorizationSnippet(config.headers)
            } catch (e) {
              return Promise.reject(e)
            }
          } else {
            throw new Error('options.authorizationSnippet not defined when authorization was requested')
          }
        }

        return Promise.resolve(config);
      }
    )
  }
}
