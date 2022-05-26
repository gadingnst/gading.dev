import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createConfig = nextJest({
  dir: './'
});

const customConfig: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  testPathIgnorePatterns: [
    '<rootDir>/.next',
    '<rootDir>/.husky',
    '<rootDir>/.vscode',
    '<rootDir>/.github',
    '<rootDir>/node_modules',
    '<rootDir>/coverage',
    '<rootDir>/dist'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx'
      }
    }
  },
  moduleNameMapper: {
    /**
     * Handle CSS imports (with CSS modules)
     * @see https://jestjs.io/docs/webpack#mocking-css-modules
     */
    '\\.(scss|sass|css)$': 'identity-obj-proxy',

    /**
     * Handle image imports
     * @see https://jestjs.io/docs/webpack#handling-static-assets
     */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/__mocks__/fileMock.js',

    /**
     * Handle alias import and module path alias
     */
    '^@/(.*)$': '<rootDir>/src/$1'

  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}']
};

module.exports = createConfig(customConfig);
