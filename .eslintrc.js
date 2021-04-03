module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': "off",
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true },
        if: { after: false },
        while: { after: false },
        for: { after: false },
        with: { after: false },
        switch: { after: false },
      },
    }],
    'brace-style': ['error', 'stroustrup'],
    'camelcase': "off",
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'css-ruleorselectorexpected': 'off',
  },
};
