const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "hc2mm6",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: true,
    json: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    code: false,
    showCode: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config);
      require("cypress-mochawesome-reporter/plugin")(on);
      on("file:preprocessor", cucumber());
      return config;
    },
    specPattern: "cypress/integration/**/*.feature",
    baseUrl: "http://localhost:3000/",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: true,
    experimentalRunAllSpecs: true,
    testIsolation: false,
  },
});
