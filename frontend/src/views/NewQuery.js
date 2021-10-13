import { useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import { Redirect } from 'react-router-dom'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'

const NewQuery = () => {
  const [savedId, setSavedId] = useState(null)
  const api = useApi()
  const refEditor = useRef()

  return (
    <main
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 64px;

        .editor-wrap {
          max-width: 1000px;
          width: 100%;
        }

        .vert-space {
          display: block;
          height: 24px;
        }
      `}
    >
      <div className='editor-wrap'>
        <CodeEditor
          id='config'
          ref={refEditor}
          language='sql'
          placeholder='select * from table'
        />

        <span className='vert-space' />

        <nav
          css={css`
            display: flex;
            flex-direction: row-reverse;
          `}
        >
          <Button
            onClick={async (event) => {
              event.preventDefault()
              const res = await api.post('/query', {
                content: refEditor.current.value,
              })
              alert('query saved')
              setSavedId(res.id)
            }}
          >
            Save
          </Button>
        </nav>
      </div>

      {typeof savedId === 'number' && (
        <Redirect to={`/query/${savedId}`} />
      )}
    </main>
  )
}

export default NewQuery
