const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
      html: false,
      json: true,
      overwrite: false,
      charts: true,
    },
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
