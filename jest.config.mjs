// jest.config.js or next.config.js
const nextJest = require('next/jest');

module.exports = nextJest({
  // ... other Next.js Jest configuration options

  // Add or modify the transform configuration to handle JSX


  // Ensure setupFilesAfterEnv is present
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
});
