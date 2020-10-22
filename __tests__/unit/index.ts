import {getEpInfo} from "../../src/ep"
import { EP } from './ep'
import { expect } from 'chai'
import axios from 'axios'
import urlInterceptor from '../../src/interceptor/url-parser-axios.interceptor'
import {APIContract} from "../../src/api-contracts"

const contract: APIContract = {
  localStorageContract: {
    TOKEN: 'token'
  },
  requestHeadersContract: {
    generalHeaders:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

describe('ep.getEpInfo() ', () => {
  it('should produce EpConfig output from given contract json', done => {
    const epinfo = getEpInfo('student.create', EP)
    // @ts-ignore
    expect(epinfo.url).to.be.equal(EP.student.create.url)
    // @ts-ignore
    expect(epinfo.method).to.be.equal(EP.student.create.method)
    done()
  })

  it('should product EpConfig even with deep structure', done => {
    const epinfo = getEpInfo('housed.admin.create', EP)
    // @ts-ignore
    expect(epinfo.url).to.be.equal(EP.housed.admin.create.url)
    // @ts-ignore
    expect(epinfo.method).to.be.equal(EP.housed.admin.create.method)
    done()
  })
})

// enable when you have a server at localhost:3000 & get endpoint at /user
// describe('axois instance test', () => {
//   it('should ', done => {
//     const options = {
//       authorizationSnippet: (headers: any) => {
//         Object.assign(headers, { 'Authorization': 'Bearer' })
//         return Promise.resolve()
//       }
//     }
//     const ax = axios.create({
//       baseURL: 'http://localhost:3000'
//     })
// 
//     urlInterceptor(EP, contract, options)(ax)
// 
//     ax.get('student.create')
//       .then(res => {
//         console.log('res is')
//         console.log(res)
//         done()
//       })
// 
//   })
// })
