import { useEffect, useState } from 'react'

import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import useApi from 'hooks/useApi'

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
    <>
      {userState === 'guest' && (
        <LoggedOut
          onLogin={(newUserInfo) => {
            setUserInfo(newUserInfo)
            setUserState('authed')
          }}
        />
      )}
      {userState === 'authed' && (
        <LoggedIn
          userInfo={userInfo}
          onLogout={() => {
            setUserState('guest')
            setUserInfo({})
          }}
        />
      )}
    </>
  )
}

export default App
