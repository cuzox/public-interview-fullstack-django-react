import colors from 'constants/colors'
import { css } from '@emotion/react'

const InputText = React.forwardRef((props, ref) => (
  <input
    type='text'
    css={css`
      border: 1px solid ${colors.GRAY_6};
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
      height: 38px;
      padding: 0 10px;
      width: 100%;

      &::placeholder {
        color: ${colors.GRAY_8};
      }
      &:focus {
        border: 1px solid ${colors.INTERACTIVE};
        outline: none;
      }
      &:disabled {
        background: ${colors.GRAY_2};
        color: ${colors.GRAY_8};
      }
    `}
    {...props}
    ref={ref}
  />
))

export default InputText
