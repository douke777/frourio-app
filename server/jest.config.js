/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: '@quramy/jest-prisma/environment',
  setupFilesAfterEnv: ['@quramy/prisma-fabbrica/scripts/jest-prisma'],
  moduleNameMapper: {
    '^\\$/(.*)$': '<rootDir>/$1',
    '^api/(.*)$': '<rootDir>/api/$1',
  },
  silent: false,
};
