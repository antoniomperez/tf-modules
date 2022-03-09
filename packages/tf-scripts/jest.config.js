module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  injectGlobals: true,
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
};
