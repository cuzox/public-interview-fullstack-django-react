import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Table from 'components/Table'
import useApi from 'hooks/useApi'

const QueriesList = () => {
  const [list, setList] = useState(null)
  const api = useApi()

  useEffect(() => {
    const fetchList = async () => {
      const res = await api.get('/queries')
      setList(res.queries)
    }
    fetchList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (list === null) {
    return null
  }

  return (
    <Table
      data={list}
      mapping={[
        ['ID', (row) => row.id],
        ['Author', (row) => row.user_name],
        [null, (row) => (
          <Link to={`/query/${row.id}`}>
            View query
          </Link>
        )]
      ]}
    />
  )
}

export default QueriesList
