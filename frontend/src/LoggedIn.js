import CodeEditor from 'components/CodeEditor'

const LoggedIn = ({ userInfo = {}, onLogout = () => {} }) => (
  <CodeEditor
    id='config'
    language='sql'
    // ref={refs.config}
    placeholder='select * from table'
  />
)

export default LoggedIn
