import { useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/query/${pk}`)
      setInitialContent(res.content)
    }
    fetchContent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return typeof initialContent === 'string' && (
    <div
      css={css`
        max-width: 1000px;
        width: 100%;
      `}
    >
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
  )
}

export default NewQuery
