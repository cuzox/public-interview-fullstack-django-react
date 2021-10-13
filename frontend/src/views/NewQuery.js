import { useRef, useState } from 'react'

import Button from 'components/Button'
import CodeEditor from 'components/CodeEditor'
import InputText from 'components/InputText'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import colors from 'constants/colors'
import { css } from '@emotion/react'
import useApi from 'hooks/useApi'

const NewQuery = () => {
  const [savedId, setSavedId] = useState(null)
  const api = useApi()
  const refEditor = useRef()
  const refName = useRef()

  return (
    <>
      <div
        css={css`
          max-width: 1000px;
          width: 100%;
        `}
      >
        <InputText
          ref={refName}
          placeholder='Query title'
        />

        <span className='vert-space' />

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
            flex-direction: row;
            justify-content: space-between;

            a {
              color: ${colors.GRAY_8};
            }
          `}
        >
          <Link to='/'>Back</Link>

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
        </nav>
      </div>

      {typeof savedId === 'number' && (
        <Redirect to={`/query/${savedId}`} />
      )}
    </>
  )
}

export default NewQuery
