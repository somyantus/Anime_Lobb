// cypress/plugins/index.js
const { startDevServer } = require('@cypress/vite-dev-server');

module.exports = (on, config) => {
  on('dev-server:start', (options) => startDevServer({ options }));
  return config;
};
