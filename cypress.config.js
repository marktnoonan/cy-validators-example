const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("@vue/cli-service/webpack.config");

module.exports = defineConfig({
    'e2e': {
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*',
        baseUrl: 'http://localhost:8080/ '
    },
    component: {
        devServer(cypressDevServerConfig) {
            return startDevServer({
                options: cypressDevServerConfig,
                webpackConfig,
            });
        },
        specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
        defaultCommandTimeout: 1000
    },
});