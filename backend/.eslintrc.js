require('@kiwikilian/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@kiwikilian/eslint-config/profile/nestjs'],
  parserOptions: { tsconfigRootDir: __dirname },
};
