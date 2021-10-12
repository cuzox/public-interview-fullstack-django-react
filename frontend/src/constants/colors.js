const Colors = Object.freeze({
  INTERACTIVE: '#7252fb',

  POSITIVE: '#43BB78',
  CRITICAL: 'rgb(129, 44, 48)',
  NEGATIVE: '#EB5C62',
  WARNING: '#F6BD60',

  // starts at light (1), goes to dark (5)
  NEUTRAL_1: '#CCEBFF',
  NEUTRAL_2: '#66C3FF',
  NEUTRAL_3: '#009BFF',
  NEUTRAL_4: '#006BB2',
  NEUTRAL_5: '#003E66',

  // starts at light(1), goes to dark (10)
  // (opposite order from figma)
  // (not adding true black, since its use should be discouraged)
  GRAY_1: '#F6F6F6',
  GRAY_2: '#F1F2F2',
  GRAY_3: '#EDEDEE',
  GRAY_4: '#E6E7E8',
  GRAY_5: '#DCDDDE',
  GRAY_6: '#D1D3D4',
  GRAY_7: '#C7C8CA',
  GRAY_8: '#939598',
  GRAY_9: '#58595B',
  GRAY_10: '#231F20',

  // shorthand to darkest gray
  BLACK: '#231F20',
})

export default Colors
