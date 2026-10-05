require('@kiwikilian/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@kiwikilian/eslint-config/profile/react'],
  parserOptions: { tsconfigRootDir: __dirname },
};
