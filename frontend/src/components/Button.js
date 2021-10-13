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
      background: ${colors.INTERACTIVE};
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      height: 30px;
      padding: 0 16px;
      transition: box-shadow 0.4s ease-out;

      &:hover {
        box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.24);
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
