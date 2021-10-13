import { useEffect, useState } from 'react'

import useApi from 'hooks/useApi'

const QueriesList = () => {
  const [list, setList] = useState(null)
  const api = useApi()

  useEffect(() => {
    const fetchList = async () => {
      const res = await api.get('/queries')
      console.log(res)
    }
    fetchList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default QueriesList
