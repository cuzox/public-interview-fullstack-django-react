import colors from 'constants/colors'
import { css } from '@emotion/react'

const Button = ({
  children,
  name,
  onClick = () => {},
  type = 'button',
  ...props
}) => (
  <button
    css={css`
      background: #fff;
      border: 2px solid ${colors.INTERACTIVE};
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      height: 30px;
      padding: 0 16px;
      transition: background 0.4s ease-out, color 0.4s ease-out;

      &:hover {
        color: #fff;
        cursor: pointer;
        background: ${colors.INTERACTIVE};
      }
    `}
    onClick={onClick}
    type={type}
    name={name}
    {...props}
  >
    {children}
  </button>
)

export default Button
