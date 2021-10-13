import { Component, createRef } from 'react'

import colors from 'constants/colors'
import MonacoEditor from 'react-monaco-editor'
import classnames from 'classnames'
import { css } from '@emotion/react'

export default class CodeEditor extends Component {
  constructor(props) {
    super(props)

    this.containerRef = createRef()
    this.monacoRef = createRef()

    this.monacoEventsRegistered = false

    this.state = {
      focused: false,
      placeholderShown: this.shouldPlaceholderShow(props.defaultValue),
    }
  }

  get value() {
    if (!this.monacoRef?.current) {
      return ''
    }
    if (this.state.placeholderShown) {
      return ''
    }
    return this.monacoRef?.current.editor.getValue().trim()
  }

  set value(newValue) {
    // will blow up if called too early
    this.monacoRef.current.editor.setValue(newValue)
  }

  focus() {
    // will blow up if called too early
    this.monacoRef.current.editor.focus()
  }

  shouldPlaceholderShow(value) {
    const { placeholder } = this.props
    // no non-empty value, and a placeholder present
    return !(value || '').trim() && (placeholder || '').trim()
  }

  onMonacoKeyDown = (event) => {
    const { trapTab = true } = this.props

    if (
      trapTab ||
      event.code !== 'Tab' ||
      !this.containerRef?.current ||
      !this.containerRef.current.contains(event.target)
    ) {
      return
    }

    event.stopPropagation()
  }

  onMonacoFocus = () => {
    const { placeholderShown } = this.state

    this.setState({ focused: true })

    if (placeholderShown) {
      this.value = ''
      this.setState({
        placeholderShown: false,
      })
    }
  }

  onMonacoBlur = () => {
    const { placeholder } = this.props

    this.setState({
      focused: false,
    })

    if (this.shouldPlaceholderShow(this.value)) {
      this.value = placeholder
      this.setState({
        placeholderShown: true,
      })
    }
  }

  registerMonacoEvents = () => {
    if (this.monacoEventsRegistered) {
      return
    }

    if (!this.monacoRef?.current || !this.monacoRef?.current.editor) {
      return
    }

    if (this.props.id) {
      try {
        this.monacoRef.current.containerElement.id = this.props.id
      } catch (err) {
        console.error(err)
      }
    }

    this.monacoEventsRegistered = true
    this.monacoRef.current.editor.onDidFocusEditorText(this.onMonacoFocus)
    this.monacoRef.current.editor.onDidBlurEditorText(this.onMonacoBlur)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onMonacoKeyDown, true)
    this.registerMonacoEvents()
  }

  componentDidUpdate() {
    this.registerMonacoEvents()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onMonacoKeyDown, true)
  }

  render() {
    const { placeholderShown, focused } = this.state
    const { defaultValue, placeholder, language } = this.props

    return (
      <div
        ref={this.containerRef}
        className={classnames({ focused, placeholderShown })}
        css={css`
          border: 1px solid ${colors.GRAY_6};
          border-radius: 6px;
          box-sizing: border-box;
          font-size: 16px;
          height: 150px;
          padding: 10px;
          width: 100%;

          &.focused {
            border: 1px solid ${colors.INTERACTIVE};
            outline: none;
          }

          &.placeholderShown * {
            color: ${colors.GRAY_8} !important;
          }

          * {
            border: none !important;
          }
        `}
      >
        <MonacoEditor
          width='100%'
          height='100%'
          language={language}
          theme='devtools'
          ref={this.monacoRef}
          defaultValue={
            placeholderShown ? placeholder : (defaultValue || '').trim()
          }
          options={{
            acceptSuggestionOnCommitCharacter: false,
            acceptSuggestionOnEnter: false,
            automaticLayout: true,
            codeLens: false,
            contextmenu: false,
            cursorBlinking: false,
            extraEditorClassName: 'code-editor',
            folding: false,
            foldingHighlight: false,
            glyphMargin: false,
            inlineHints: {
              enabled: false,
            },
            lightbulb: {
              enabled: false,
            },
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            lineNumbers: 'off',
            links: false,
            minimap: {
              enabled: false,
            },
            overviewRulerLanes: 0,
            padding: {
              bottom: 0,
              top: 0,
            },
            selectionHighlight: false,
            scrollBeyondLastLine: false,
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
            snippetSuggestions: 'none',
            tabindex: '0',
          }}
        />
      </div>
    )
  }
}
