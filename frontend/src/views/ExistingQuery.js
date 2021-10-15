import { useEffect, useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import InputText from 'components/InputText'
import { Link } from 'react-router-dom'
import QueryResults from 'components/QueryResult'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import useHashCode from 'hooks/useHashCode'
import { useParams } from 'react-router-dom'

const ExistingQuery = ({ userInfo }) => {
  const [initialName, setInitialName] = useState(null)
  const [initialContent, setInitialContent] = useState(null)
  const [authorId, setAuthorId] = useState(null)
  // persisted content reflects what is saved to the db
  // we use this to distinguish aginst what is being run ad hoc
  const [persistedHashCode, _, setPersistedContent] = useHashCode()
  // applied content will reflect whatever content is either
  // persisted or being executed ad hoc
  const [appliedHashCode, appliedContent, setAppliedContent] = useHashCode()
  // we will compare the active hash code against
  // the applied hash code to determine if there are changes
  const [liveContent, setLiveContent] = useState(null)
  const api = useApi()
  const refEditor = useRef()
  const refName = useRef()
  const { pk } = useParams()

  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/query/${pk}`)
      setAuthorId(res.author_id)
      setInitialName(res.name)
      setInitialContent(res.content)
      setPersistedContent(res.content.trim())
      setAppliedContent(res.content.trim())
      setLiveContent(res.content.trim())
    }
    fetchContent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return typeof initialContent === 'string' && (
    <div
      css={css`
        max-width: 1000px;
        width: 100%;

        .editor {
          height: 320px;
        }
      `}
    >
      <InputText
        ref={refName}
        placeholder='Query title'
        defaultValue={initialName}
      />

      <span className='vert-space' />

      <CodeEditor
        className='editor'
        ref={refEditor}
        language='sql'
        placeholder='select * from table'
        defaultValue={initialContent}
        onKeyUp={() => {
          const value = refEditor.current.value.trim()
          if (value !== liveContent) {
            setLiveContent(value)
          }
        }}
      />

      <span className='vert-space' />

      <nav
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <Link to='/'>← Saved Queries</Link>

        <span
          css={css`
            align-items: center;
            display: flex;
            flex-direction: row;

            a {
              font-size: 14px;
            }
          `}
        >
          {liveContent !== appliedContent && (
            <a
              href='#run'
              onClick={(event) => {
                event.preventDefault()
                setAppliedContent(liveContent)
              }}
            >
              Run query
            </a>
          )}

          {(
            liveContent !== appliedContent &&
            userInfo.id === authorId
          ) && (
            <span className='horiz-space' />
          )}

          {userInfo.id === authorId && (
            <Button
              onClick={async (event) => {
                event.preventDefault()
                await api.put(`/query/${pk}`, {
                  name: refName.current.value,
                  content: refEditor.current.value,
                })
                alert('query updated')
                setPersistedContent(refEditor.current.value.trim())
                setAppliedContent(refEditor.current.value.trim())
              }}
            >
              Update
            </Button>
          )}
        </span>
      </nav>

      <span className='vert-space' />

      <QueryResults
        pk={pk}
        key={appliedHashCode}
        adHocQuery={persistedHashCode !== appliedHashCode ? appliedContent : null}
      />
    </div>
  )
}

export default ExistingQuery
