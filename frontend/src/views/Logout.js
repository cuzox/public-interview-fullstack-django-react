import { useEffect, useState } from 'react'

import { Redirect } from 'react-router-dom'
import useApi from 'hooks/useApi'

const Logout = ({ onLogout = () => {} }) => {
  const [pending, setPending] = useState(true)
  const api = useApi()

  useEffect(() => {
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

export default Logout
