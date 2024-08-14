module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 0,
  },
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      parser: 'flow',
    },
  ],
};
