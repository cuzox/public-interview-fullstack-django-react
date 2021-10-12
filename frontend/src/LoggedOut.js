import React from 'react'
import InputText from 'components/InputText'
import { css } from '@emotion/react'

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
        box-shadow 0 0 8px 8px rgba(0, 0, 0, 0.42);
        padding: 24px;
      `}
    >
      <label>Email</label>
      <InputText />
    </main>
  </div>
)

export default LoggedOut
