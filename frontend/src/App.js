import { Route, Router, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import LoggedIn from 'views/LoggedIn'
import LoggedOut from 'views/LoggedOut'
import Logout from 'views/Logout'
import { createBrowserHistory } from 'history'
import { monaco } from 'react-monaco-editor'
import monacoDevtoolsTheme from 'monaco-themes/themes/Chrome DevTools.json'
import useApi from 'hooks/useApi'
import { UserContext } from 'contexts'

const history = createBrowserHistory()

delete monacoDevtoolsTheme.colors['editor.lineHighlightBackground']

monaco.editor.defineTheme('devtools', monacoDevtoolsTheme)

const App = () => {
  const [userState, setUserState] = useState('pending')
  const [userInfo, setUserInfo] = useState({})
  const api = useApi()

  useEffect(() => {
    const fetchBootstrap = async () => {
      const bootstrap = await api.get('/bootstrap')
      if (bootstrap.authed) {
        setUserInfo(bootstrap.user)
        return setUserState('authed')
      }
      setUserState('guest')
    }
    fetchBootstrap()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router history={history}>
      <Switch>
        <Route path='/logout'>
          <Logout
            onLogout={() => {
              setUserState('guest')
              setUserInfo({})
            }}
          />
        </Route>

        <Route>
          {userState === 'guest' && (
            <LoggedOut
              onLogin={(newUserInfo) => {
                setUserInfo(newUserInfo)
                setUserState('authed')
              }}
            />
          )}
          {userState === 'authed' && (
            <UserContext.Provider value={userInfo}>
              <LoggedIn />
            </UserContext.Provider>
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
