const InputCheckbox = React.forwardRef((props, ref) => (
  <input
    type='checkbox'
    {...props}
    ref={ref}
  />
))

export default InputCheckbox
