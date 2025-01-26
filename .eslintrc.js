// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  plugins: [
    'unused-imports'
  ],
  rules: {
    'import/no-unused-modules': [1, {"unusedExports": true}],
    'unused-imports/no-unused-imports': 'warn', // Warn for unused imports
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }, ],
  },
};
