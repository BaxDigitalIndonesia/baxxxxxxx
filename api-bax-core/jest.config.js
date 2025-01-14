/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest", // using preset TypeScript untuk Jest
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testTimeout: 10000,
  testMatch: ["**/tests/**/*.test.ts"], // location test file
  clearMocks: true, // automatically clear mock files
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTestDB.ts"], // run setup database
};