import { useEffect, useState, useContext } from 'react'

import Button from 'components/Button'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import Upsell from 'components/Upsell'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import { UserContext } from 'contexts'
import colors from "../constants/colors"


const QueriesList = () => {
  const userInfo = useContext(UserContext)
  const userIsGuest = userInfo.role === "guest"
  const getIsCurrentUser = (id) => userInfo.id === id
  const [showUpsell, setShowUpsell] = useState(false)

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
            !userIsGuest || getIsCurrentUser(row.user_id) ? (
              <Link to={`/query/${row.id}`}>
                View query
              </Link>
            ) : (
              <span css={css`
                  cursor: pointer;
                  color: ${ colors.INTERACTIVE };
                `}
                onClick={ () => setShowUpsell(true) }
              >
                View query
              </span>
            )
          )]
        ]}
      />


        { showUpsell ?
          <Upsell hide={() => setShowUpsell(false)} /> :
          null
        }
    </article>
  )
}

export default QueriesList
