const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fb1oy8',

  // component: {
  //     devServer:{
  //         framework: 'vue-cli',
  //         bundler: 'webpack',
  //     },
  //     defaultCommandTimeout: 500
  // },
  e2e: {
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*",
    baseUrl: "http://localhost:8080/",
    experimentalStudio: true,
    experimentalRunAllSpecs: true,
    test: "",
    retries: 3
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
    video: false
  },
});
