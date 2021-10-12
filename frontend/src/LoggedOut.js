import { Global, css } from '@emotion/react'

import Button from 'components/Button'
import InputText from 'components/InputText'

const LoggedOut = () => (
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
      <InputText />
      
      <span className='vert-space' />

      <label>Password</label>
      <InputText type='password' />

      <span className='vert-space' />

      <nav
        css={css`
          display: flex;
          flex-direction: row-reverse;
        `}
      >
        <Button
          onClick={(event) => {
            event.preventDefault()
            console.log('clicked')
          }}
        >
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

export default LoggedOut
