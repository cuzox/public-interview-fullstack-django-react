import { Route, Switch } from 'react-router-dom'
import { useState, useContext } from 'react'

import ExistingQuery from 'views/ExistingQuery'
import { Link } from 'react-router-dom'
import Logotype from 'components/Logotype'
import Upsell from 'components/Upsell'
import NewQuery from 'views/NewQuery'
import QueriesList from 'views/QueriesList'
import { css } from '@emotion/react'
import { UserContext } from "../contexts"

const LoggedIn = () => {
  const userInfo = useContext(UserContext)
  const userIsGuest = userInfo.role === "guest"
  const [show, setShow] = useState(false)

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;

        .vert-space {
          display: block;
          height: 24px;

          &.half {
            height: 12px;
          }
        }

        .horiz-space {
          display: inline-block;
          width: 24px;

          &.half {
            width: 12px;
          }
        }
      `}
    >
      <header
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 12px 64px;
        `}
      >
        <Link to='/'>
          <Logotype height='24px' />
        </Link>

        <section>
          <span>
            Logged in as
            {' '}
            <span
              css={css`
                font-weight: 600;
              `}
            >
              {userInfo.name}
              <span>
                <span
                  onClick={() => userIsGuest && setShow(true)}
                  css={css`
                    cursor: ${ userIsGuest ? 'pointer' : 'default' };
                    margin-left: 5px;
                  `}
                >{`[${userInfo.role}]`}</span>
                { show ?
                  <Upsell hide={() => setShow(false)} /> :
                  null
                }
              </span>
            </span>
          </span>

          <span className='horiz-space' />

          <Link to='/logout'>Logout</Link>
        </section>
      </header>

      <main
        css={css`
          align-items: center;
          display: flex;
          flex-direction: column;
          padding: 64px;

          .vert-space {
            display: block;
            height: 24px;
          }
        `}
      >
        <Switch>
          <Route path='/query/new' exact>
            <NewQuery />
          </Route>

          <Route path='/query/:pk' exact>
            <ExistingQuery userInfo={userInfo} />
          </Route>

          <Route path='/' exact>
            <QueriesList />
          </Route>
        </Switch>
      </main>
      <div id="modal" />
    </div>
  )
}

export default LoggedIn
