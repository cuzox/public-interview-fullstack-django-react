const { override, addBabelPreset, addWebpackPlugin } = require('customize-cra')

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const webpack = require('webpack')

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addWebpackPlugin(new webpack.ProvidePlugin({
    React: 'react',
  })),
  // addWebpackPlugin(new MonacoWebpackPlugin({
  //   // see https://github.com/Microsoft/monaco-editor-webpack-plugin#options
  //   filename: 'dashboard/monaco/[name].worker.js',
  //   languages: ['json', 'sql'],
  //   features: ['!accessibilityHelp', '!anchorSelect', '!bracketMatching', '!caretOperations', '!clipboard', '!codeAction', '!codelens', '!colorPicker', '!comment', '!contextmenu', '!coreCommands', '!cursorUndo', '!dnd', '!documentSymbols', '!find', '!folding', '!fontZoom', '!format', '!gotoError', '!gotoLine', '!gotoSymbol', '!hover', '!iPadShowKeyboard', '!inPlaceReplace', '!indentation', '!inlineHints', '!inspectTokens', '!linesOperations', '!linkedEditing', '!links', '!multicursor', '!parameterHints', '!quickCommand', '!quickHelp', '!quickOutline', '!referenceSearch', '!rename', '!smartSelect', '!snippets', '!suggest', '!toggleHighContrast', '!toggleTabFocusMode', '!transpose', '!unusualLineTerminators', '!viewportSemanticTokens', '!wordHighlighter', '!wordOperations', '!wordPartOperations'],
  // }))
)
