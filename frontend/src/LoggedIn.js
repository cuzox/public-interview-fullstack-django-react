import CodeEditor from 'components/CodeEditor'
import Logotype from 'components/Logotype'
import { css } from '@emotion/react'

const LoggedIn = ({ userInfo = {}, onLogout = () => {} }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      width: 100%;
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
      <Logotype height='24px' />
      <a href='/logout'>Logout</a>
    </header>

    <main
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 64px;
        width: 100%;

        .editor-wrap {
          max-width: 1000px;
          width: 100%;
        }
      `}
    >
      <div className='editor-wrap'>
        <CodeEditor
          id='config'
          language='sql'
          // ref={refs.config}
          placeholder='select * from table'
        />
      </div>
    </main>
  </div>
)

export default LoggedIn
