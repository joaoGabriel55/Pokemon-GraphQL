/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)"],
};
