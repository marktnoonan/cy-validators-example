const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '69mv85',
    'e2e': {
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*',
        baseUrl: 'http://localhost:8080/',
        experimentalStudio: true,
        test: ''
    },
    component: {
        devServer:{
            framework: 'vue-cli',
            bundler: 'webpack',
        },
        defaultCommandTimeout: 1000
    },
});