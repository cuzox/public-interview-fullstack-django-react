import { useEffect, useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import InputText from 'components/InputText'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import { useParams } from 'react-router-dom'

const NewQuery = () => {
  const [initialName, setInitialName] = useState(null)
  const [initialContent, setInitialContent] = useState(null)
  const api = useApi()
  const refEditor = useRef()
  const refName = useRef()
  const { pk } = useParams()

  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/query/${pk}`)
      setInitialName(res.name)
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
      <InputText
        ref={refName}
        placeholder='Query title'
        defaultValue={initialName}
      />

      <span className='vert-space' />

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
              name: refName.current.value,
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
