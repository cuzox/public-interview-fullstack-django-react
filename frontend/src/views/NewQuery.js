import { Link, Redirect } from 'react-router-dom'
import { useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import InputText from 'components/InputText'
import QueryResults from 'components/QueryResult'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import useHashCode from 'hooks/useHashCode'

const NewQuery = ({ userInfo }) => {
  const [savedId, setSavedId] = useState(null)
  // applied content will reflect content that was run ad hoc
  const [appliedHashCode, appliedContent, setAppliedContent] = useHashCode()
  // we will compare the active hash code against
  // the applied hash code to determine if there are changes
  const [liveContent, setLiveContent] = useState(null)
  const api = useApi()
  const refEditor = useRef()
  const refName = useRef()

  return (
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
      />

      <span className='vert-space' />

      <CodeEditor
        className='editor'
        ref={refEditor}
        language='sql'
        placeholder='select * from table'
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
          {liveContent && liveContent !== appliedContent && (
            <>
              <a
                href='#run'
                onClick={(event) => {
                  event.preventDefault()
                  setAppliedContent(liveContent)
                }}
              >
                Run query
              </a>

              <span className='horiz-space' />
            </>
          )}

          <Button
            onClick={async (event) => {
              event.preventDefault()
              const res = await api.post('/query', {
                name: refName.current.value,
                content: refEditor.current.value,
              })
              alert('query saved')
              setSavedId(res.id)
            }}
          >
            Save
          </Button>
        </span>
      </nav>

      {appliedContent && (
        <>
          <span className='vert-space' />

          <QueryResults
            key={appliedHashCode}
            adHocQuery={appliedContent}
          />
        </>
      )}

      {typeof savedId === 'number' && (
        <Redirect to={`/query/${savedId}`} />
      )}
    </div>
  )
}

export default NewQuery
