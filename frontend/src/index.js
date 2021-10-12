import { Global, css } from '@emotion/react'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import colors from 'constants/colors'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Global
      styles={css`
        body {
          color: ${colors.BLACK};
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        }
      `}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
