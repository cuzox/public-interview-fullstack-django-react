import { Global, css } from '@emotion/react'
import { useCallback, useRef } from 'react'

import Button from 'components/Button'
import InputText from 'components/InputText'
import useApi from 'hooks/useApi'

const LoggedOut = ({ onLogin = () => {} }) => {
  const refEmail = useRef(null)
  const refPassword = useRef(null)
  const api = useApi()

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const loginResult = await api.post('/login', {
        email: refEmail.current.value,
        password: refPassword.current.value,
      })
      if (loginResult.authed) {
        onLogin(loginResult.user)
      }
    },
    [api, refEmail, refPassword]
  )

  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: center;
        width: 100%;
      `}
    >
      <main
        css={css`
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 0 32px 16px rgba(0, 64, 128, 0.28);
          padding: 24px;
          width: 300px;

          label {
            display: block;
            font-weight: 600;
            margin-bottom: 6px;
          }

          .vert-space {
            display: block;
            height: 24px;
          }
        `}
      >
        <label>Email</label>
        <InputText ref={refEmail} />
        
        <span className='vert-space' />

        <label>Password</label>
        <InputText
          ref={refPassword}
          type='password'
          onKeyPress={(event) => {
            if (event.key !== 'Enter') {
              return
            }
            onSubmit(event)
          }}
        />

        <span className='vert-space' />

        <nav
          css={css`
            display: flex;
            flex-direction: row-reverse;
          `}
        >
          <Button onClick={onSubmit}>
            Login
          </Button>
        </nav>
      </main>

      <Global
        styles={css`
          html, body, #root {
            height: 100vh;
            min-height: 400px;
          }
        `}
      />
    </div>
  )
}

export default LoggedOut
