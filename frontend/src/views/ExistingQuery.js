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
import { useParams } from 'react-router-dom'

const QueryResults = ({ pk }) => {
  const [status, setStatus] = useState('pending')
  const [results, setResults] = useState(null)
  const [explanationResult, setExplanationResult] = useState(null)
  const [explaining, setExplaining] = useState(false)
  const refExplain = useRef(null)
  const api = useApi()

  useEffect(() => {
    const fetchResults = async () => {
      setStatus('pending')
      const res = await api.get(`/query/${pk}/execute`)
      setResults(res)
      setStatus('ready')
    }

    const fetchExplanation = async () => {
      setStatus('pending')
      const res = await api.get(`/query/${pk}/explain`)
      setExplanationResult(res)
      setStatus('ready')
    }

    if (explaining) {
      fetchExplanation()
    } else {
      fetchResults()
    }
  }, [pk, api, setResults, setStatus, setExplanationResult, explaining])

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

      <span className='vert-space' />

      <QueryResults pk={pk} />
    </div>
  )
}

export default NewQuery
