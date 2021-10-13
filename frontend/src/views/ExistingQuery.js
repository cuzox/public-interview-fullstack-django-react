import { useMemo, useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import { useParams } from 'react-router-dom'

const NewQuery = () => {
  const [initialContent, setInitialContent] = useState(null)
  const api = useApi()
  const refEditor = useRef()
  const { pk } = useParams()

  useMemo(() => {
    const fetchContent = async () => {
      const res = await api.get(`/query/${pk}`)
      setInitialContent(res.content)
    }
    fetchContent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return typeof initialContent === 'string' && (
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
          defaultValue={initialContent}
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
              await api.put(`/query/${pk}`, {
                content: refEditor.current.value,
              })
              alert('query updated')
            }}
          >
            Update
          </Button>
        </nav>
      </div>
    </main>
  )
}

export default NewQuery
