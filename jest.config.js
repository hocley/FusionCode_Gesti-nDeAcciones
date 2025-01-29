/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/backend/src/tests"],
  testMatch: [
    "**/*.test.js",
    "**/*.spec.js"
  ],
  verbose: true,
  setupFiles: ["<rootDir>/jest.setup.js"] // 🔹 Cargamos `jest.setup.js`
};

module.exports = config;
