module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@services': './src/services',
          '@models': './src/models',
          '@entities': './src/database/entities',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
