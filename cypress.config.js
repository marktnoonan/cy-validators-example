const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'rsu428',
    'e2e': {
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*',
        baseUrl: 'http://localhost:8080/',
        experimentalStudio: true
    },
    component: {
        devServer:{
            framework: 'vue-cli',
            bundler: 'webpack',
        },
        specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
        defaultCommandTimeout: 1000
    },
});