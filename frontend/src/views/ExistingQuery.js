import { useEffect, useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import InputCheckbox from 'components/InputCheckbox'
import InputText from 'components/InputText'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import colors from 'constants/colors'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import useHashCode from 'hooks/useHashCode'
import { useParams } from 'react-router-dom'

const QueryResults = ({ pk, adHocQuery = null }) => {
  const [status, setStatus] = useState('pending')
  const [results, setResults] = useState(null)
  const [explanationResult, setExplanationResult] = useState(null)
  const [explaining, setExplaining] = useState(false)
  const refExplain = useRef(null)
  const api = useApi()

  useEffect(() => {
    const fireGet = async (action) => {
      if (adHocQuery) {
        return api.get(`/query/ad_hoc/${action}`, {
          content: adHocQuery
        })
      }
      return api.get(`/query/${pk}/${action}`)
    }
  
    const fetchResults = async () => {
      setStatus('pending')
      const res = await fireGet('execute')
      setResults(res)
      setStatus('ready')
    }

    const fetchExplanation = async () => {
      setStatus('pending')
      const res = await fireGet('explain')
      setExplanationResult(res)
      setStatus('ready')
    }

    if (explaining) {
      fetchExplanation()
    } else {
      fetchResults()
    }
  }, [pk, api, setResults, setStatus, setExplanationResult, explaining, adHocQuery])

  const resultsApplied = explaining ? explanationResult : results
  const { explanation, data, columns, error } = resultsApplied || {}
  const haveError = !!error
  const haveData = Array.isArray(data) && data.length > 0

  return (
    <article
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        header {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        h2 {
          display: block;
          font-size: 18px;
          font-weight: 600;
        }

        h3 {
          display: block;
          font-size: 14px;
          font-weight: 600;
        }

        .status-explained {
          font-weight: 600;
        }

        pre {
          background: ${colors.GRAY_1};
          border: 1px solid ${colors.GRAY_3};
          display: inline-block;
          font-size: 14px;
          overflow-x: scroll;
          padding: 16px;
        }
      `}
    >
      <header
        css={css`
          a {
            font-size: 12px;
          }
        `}
      >
        <span
          css={css`
            align-items: center;
            display: flex;
            flex-direction: row;
          `}
        >
          <h2>Query Results</h2>

          {status === 'ready' && !haveError && (
            <>
              <span className='horiz-space' />

              <span
                css={css`
                  align-items: center;
                  display: flex;
                  flex-direction: row;
                  font-size: 12px;

                  label {
                    cursor: pointer;
                    margin-left: 6px;
                  }
                `}
              >
                <InputCheckbox
                  ref={refExplain}
                  defaultChecked={explaining}
                  onChange={() => {
                    setExplaining(refExplain.current.checked)
                  }}
                />
                <label
                  onClick={() => {
                    refExplain.current.checked = !refExplain.current.checked
                    setExplaining(refExplain.current.checked)
                  }}
                >
                  explain
                </label>
              </span>
            </>
          )}
        </span>

        {status === 'ready' && !haveError && haveData && (
          <a
            href={`http://localhost:8000/query/${pk}/execute/csv`}
            download
          >
            Download CSV
          </a>
        )}
      </header>

      <div className='vert-space' />

      {status === 'pending' && (
        <span className='status-explained'>pending...</span>
      )}

      {status === 'ready' && haveError && (
        <>
          <h3>An error occurred while executing the query</h3>
          <span className='vert-space half' />
          <pre>
            <code>
              {error}
            </code>
          </pre>
        </>
      )}

      {status === 'ready' && !haveError && explaining && (
        <>
          <h3>Query plan</h3>
          <span className='vert-space half' />
          <pre>
            <code>
              {explanation}
            </code>
          </pre>
        </>
      )}

      {status === 'ready' && !haveError && !explaining && !haveData && (
        <span className='status-explained'>zero rows were returned</span>
      )}
      
      {status === 'ready' && !haveError && !explaining && haveData && (
        <Table
          data={data}
          mapping={columns.map(((key, index) => [key, (row) => row[index]]))}
        />
      )}
    </article>
  )
}

const NewQuery = ({ userInfo }) => {
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

export default NewQuery
