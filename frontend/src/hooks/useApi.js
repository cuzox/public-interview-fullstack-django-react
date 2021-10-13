import Cookies from 'js-cookie'
import { useMemo } from 'react'

const csrfTokenCookieName = 'csrftoken'
const methodUsingFormData = ['put', 'post', 'patch']

/*
  The `useApi` hook returns API verb functions, which take api paths, and
  return a response value, after being awaited
  
  ```
  const api = useApi()
  const data = await api.get('/bootstrap')
  ```

  You can pass a arguments into the verb function, which will be passed
  as either `request.body` or URL params (whichever is appropriate)

  ```
  const data = await api.patch('/account', { name: 'kona' })
  ```
*/

function makeRequest({
  url,
  method,
  data,
  middleware = [],
}) {
  const requestConfig = {
    method,
  }

  const usingFormData = methodUsingFormData.includes(method)

  if (usingFormData) {
    requestConfig.headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get(csrfTokenCookieName),
    }
  }

  if (data) {
    if (usingFormData) {
      requestConfig.body = JSON.stringify(data)
    } else {
      url = `${url}?${new URLSearchParams(data)}`
    }
  }

  const middlewareApplied = middleware.concat(
    (response) => response.json(),
  )

  url = `//localhost:8000/${url.replace(/^\//, '')}`

  let result = fetch(url, requestConfig)
  while (middlewareApplied.length) {
    const handler = middlewareApplied.shift()
    result = result.then((value) => handler(value, escape))
  }
  return result
}

export default function useApi() {
  return useMemo(() => {
    return ['get', 'put', 'patch', 'post', 'delete', 'head', 'options'].reduce((mapping, verb) => {
      mapping[verb] = (url, data, middleware) => makeRequest({
        url,
        data,
        middleware,
        method: verb
      })
      return mapping
    }, {})
  }, [])
}
