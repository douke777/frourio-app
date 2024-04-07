/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: '@quramy/jest-prisma/environment',
  moduleNameMapper: {
    '^\\$/(.*)$': '<rootDir>/$1',
  },
  silent: false,
};
