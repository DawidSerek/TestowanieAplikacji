const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://testpages.eviltester.com",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
