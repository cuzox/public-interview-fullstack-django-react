import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import { createBrowserHistory } from 'history'
import useApi from 'hooks/useApi'

const history = createBrowserHistory()

const LogoutView = ({ onLogout = () => {} }) => {
  const [pending, setPending] = useState(true)
  const api = useApi()

  useMemo(() => {
    if (!pending) {
      return
    }

    const triggerLogout = async () => {
      await api.post('/logout')
      onLogout()
      setPending(false)
    }
    triggerLogout()
  }, [pending, setPending])

  return !pending && <Redirect to='/' />
}

const App = () => {
  const [userState, setUserState] = useState('pending')
  const [userInfo, setUserInfo] = useState({})
  const api = useApi()
  
  useEffect(() => {
    const fetchBoostrap = async () => {
      const bootstrap = await api.get('/bootstrap')
      if (bootstrap.authed) {
        setUserInfo(bootstrap.user)
        return setUserState('authed')
      }
      setUserState('guest')
    }
    fetchBoostrap()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router history={history}>
      <Switch>
        <Route path='/logout'>
          <LogoutView
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
            <LoggedIn userInfo={userInfo} />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
