import { useEffect, useState } from 'react'

import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import useApi from 'hooks/useApi'

const App = () => {
  const [userState, setUserState] = useState('pending')
  const api = useApi()
  
  useEffect(() => {
    const fetchBoostrap = async () => {
      const bootstrap = await api.get('/bootstrap')
      if (bootstrap.authed) {
        // todo
        return
      } else {
        return setUserState('guest')
      }
    }
    fetchBoostrap()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {userState === 'guest' && (<LoggedOut />)}
      {userState === 'authed' && (<LoggedIn />)}
    </div>
  )
}

export default App
