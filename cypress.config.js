const { defineConfig } = require("cypress")
const fs = require('fs-extra')
const path = require('path')
const { parse } = require("papaparse")

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 80000,
  pageLoadTimeout: 80000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      try {
          const csvFile = fs.readFileSync("cypress/fixtures/calculator-data.csv", "utf8")
          const csvResults = parse(csvFile, {
            header: true,
            complete: csvData => csvData.data
        }).data
          fs.writeFileSync("cypress/fixtures/calculator-data.json", JSON.stringify(csvResults, null, 4), "utf-8")
      } catch (e) {
          throw Error(e)
      }
      
      const file = config.env.configFile || "production"
      const pathToConfigFile = path.resolve('cypress/config', `${file}.json`)
      return fs.readJson(pathToConfigFile)
    }
  }
})