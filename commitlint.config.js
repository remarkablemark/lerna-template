const { readdirSync } = require('fs');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100],
    'scope-enum': [
      2,
      'always',
      [
        'all',
        'deps',
        'deps-dev',
        'packages',
        'release',
        'root',
        ...readdirSync('./packages'),
      ],
    ],
    'scope-empty': [2, 'never'],
  },
};
