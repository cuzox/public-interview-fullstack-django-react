import { useEffect, useState } from 'react'

import Button from 'components/Button'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import { css } from '@emotion/react'
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
    <article
      css={css`
        display: block;
      `}
    >
      <nav
        css={css`
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;

          h2 {
            display: block;
            font-size: 18px;
            font-weight: 600;
          }
        `}
      >
        <h2>Saved Queries</h2>

        <Link to='/query/new'>
          <Button>Add a Query</Button>
        </Link>
      </nav>

      <div className='vert-space' />

      <Table
        data={list}
        mapping={[
          ['ID', (row) => row.id],
          ['Title', (row) => row.name],
          ['Author', (row) => row.user_name],
          [null, (row) => (
            <Link to={`/query/${row.id}`}>
              View query
            </Link>
          )]
        ]}
      />
    </article>
  )
}

export default QueriesList
