import { useEffect, useRef, useState, useContext } from 'react'

import InputCheckbox from 'components/InputCheckbox'
import Table from 'components/Table'
import Upsell from 'components/Upsell'
import colors from 'constants/colors'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'
import { UserContext } from '../contexts'

const QueryResults = ({ pk, adHocQuery = null }) => {
  const userInfo = useContext(UserContext)
  const userIsGuest = userInfo.role === "guest"
  const [showUpsell, setShowUpsell] = useState(false)

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

              { !userIsGuest &&
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
              }
            </>
          )}
        </span>

        {status === 'ready' && !haveError && haveData && (
          !userIsGuest ? (
            <a
              href={adHocQuery ?
                `http://localhost:8000/query/ad_hoc/execute/csv?${new URLSearchParams({ content: adHocQuery })}` :
                `http://localhost:8000/query/${pk}/execute/csv`
              }
              download
            >
              Download CSV
            </a>
          ) : (
            <span css={css`
              cursor: pointer;
              color: ${ colors.INTERACTIVE };
            `}
            onClick={ () => setShowUpsell(true) }>
              Download CSV
            </span>
          )
        )}

        { showUpsell ?
          <Upsell hide={() => setShowUpsell(false)} /> :
          null
        }
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

export default QueryResults
