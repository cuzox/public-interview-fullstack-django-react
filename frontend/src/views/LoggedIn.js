import { Route, Switch } from 'react-router-dom'

import ExistingQuery from 'views/ExistingQuery'
import QueriesList from 'views/QueriesList'
import Logotype from 'components/Logotype'
import NewQuery from 'views/NewQuery'
import { css } from '@emotion/react'

const LoggedIn = ({ userInfo = {}, onLogout = () => {} }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      width: 100%;

      .vert-space {
        display: block;
        height: 24px;
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
      <a href='/'>
        <Logotype height='24px' />
      </a>

      <a href='/logout'>Logout</a>
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
        <Route path='/query/new'>
          <NewQuery />
        </Route>

        <Route path='/query/:pk'>
          <ExistingQuery />
        </Route>

        <Route>
          <QueriesList />
        </Route>
      </Switch>
    </main>
  </div>
)

export default LoggedIn
