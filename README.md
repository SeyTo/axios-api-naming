This library is for `axios` based projects.

Steps to build an intercepted axios where requests are refined.

1. The API is defined like this. There is also an example in `__tests__`

```json
const EP = {
  books: {
   'create': {
      url: '/user',
      method: 'get'
   },
   user: {
    'login': {
      url: '/login',
      method: 'post'
    },
    'secrets': {
      url: '/secrets',
      method: 'post',
      headers: {
        authorization: true
      }
    }
  }
}
```

2. Create/use an axios instance of your config.

```js
const ax = axios.create({
  baseURL: 'http://localhost:3000'
})
```

3. Assign urlInterceptor to your axios.

```js

const restContract: APIContract = {
  localStorageContract: {
    // not used
  },
  requestHeadersContract: {
    // these headers will be applied to all request. @Deprecating
    generalHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

// create options for url interceptor
const options = {
  authorizationSnippet: (headers: any) => {
    // this option is used when you assign 'authorization: true' in your contract.
    // Basically, you get to define what your headers/body/path should look like
    // when contract demands authorization.
    Object.assign(headers, { 'Authorization': 'Bearer'  })
    return Promise.resolve()
  }
}

urlInterceptor(EP, restContract)

// aaand done

// now call using your axios instance like this

ax.use('books.create')
  .then(res => {
    // do something
  })
```

4. Dont use this library if you are sane person.

