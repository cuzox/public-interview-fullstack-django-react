import { useEffect, useState } from 'react'

// import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import useApi from 'hooks/useApi'

const App = () => {
  const [userState, setUserState] = useState('pending')
  const api = useApi()
  
  useEffect(async () => {
    const bootstrap = await api.get('/bootstrap')
    console.log(bootstrap)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <LoggedOut />
    </div>
  )
}

export default App
