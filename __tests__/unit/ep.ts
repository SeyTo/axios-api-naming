import {EPImpl} from "../../src/ep";

export const EP: EPImpl = {
  student: {
    'create': {
      url: '/user',
      method: 'get'
    },
    'login': {
      url: '/auth/stu/login',
      method: 'post'
    },
    'logout': {
      url: '/auth/stu/logout',
      method: 'post',
      headers: {
        authorization: true
      }
    }
  },
  housed: {
    admin: {
      'create': {
        url: '/u/adm/create',
        method: 'put'
      }
    }
  }
}
