module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
    transform: {
      '^.+\\.(ts|js|html)$': [
        'jest-preset-angular',
        {
          tsconfig: '<rootDir>/tsconfig.spec.json',
          stringifyContentPathRegex: '\\.(html|svg)$',
        },
      ],
    },
    moduleNameMapper: {
      '^src/(.*)': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    coverageReporters: ['lcov'],
    collectCoverage: true,
    coverageDirectory: 'coverage/bee-project',
  };
  