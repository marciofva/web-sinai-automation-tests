/// <reference types="Cypress" />

import reportSection from '../page-objects/report-section'
import homeEnergySection from '../page-objects/home-energy-section'
import Utils from '../support/helper'
const testData = require('../fixtures/calculator-data.json')

let utils = new Utils()


describe('HOME ENERGY section', () => {

  beforeEach(() => {
    cy.launchBrowser()

    const zipcodes = ["85001", "33125", "71601", "05544", "20101", "73301", "59001"]

    const data = {
      numberOfPeople: Math.floor(Math.random() * 12) + 1,
      zipcode: zipcodes[Math.floor(Math.random() * zipcodes.length)]
    }
    cy.getStarted(data)
  })


  context('the current emissions from home energy subsection', () => {

    Cypress._.times(testData.length, (i) => {
      it('validate the sum of current total (lbs.) calculation', () => {
        
        cy.currentEmissions(
          testData[i].primaryHeatingSource, 
          testData[i].naturalGas.split('-'), 
          testData[i].electricity.split('-'), 
          testData[i].fuel.split('-'), 
          testData[i].propane.split('-'))
        .then(function () {
            let sum = 0
            cy.get(homeEnergySection.lbTotalLabel).should('have.length', 4).each(($el, index, $lis) => {
                sum = sum + utils.convertToNumber($el.text())
            }).then(() => {
                cy.get(reportSection.totalEmissionsLabel).should('have.text', utils.formatNumber(sum))
          })
        })
      })
    })
  })


  context('reduce your emissions subsection', () => {

    const index = Math.floor(Math.random() * testData.length)

    beforeEach(() => {
      cy.currentEmissions(
        testData[index].primaryHeatingSource, 
        testData[index].naturalGas.split('-'), 
        testData[index].electricity.split('-'), 
        testData[index].fuel.split('-'), 
        testData[index].propane.split('-'))
    })

    it('validate "Annual Savings" from the turn up A/C thermostat', () => {
      cy.fillEnergyAC(testData[index].energyAC).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getEnergyACCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the turn down heating thermostat', () => {
      cy.fillEnergyHeat(testData[index].energyHeat).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getEnergyHeatCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the light energy by replacing incandescent lightbulbs', () => {
      cy.fillLightEnergy(testData[index].lightEnergy).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getLightEnergyCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the power management features', () => {
      cy.fillComputerPwr(testData[index].computerPwr).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getComputerPwrCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the increase of household Green Power usage', () => {
      cy.fillIncreaseGreen(testData[index].increaseGreen).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getIncreaseGreenCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the clothes washing in cold water', () => {
      cy.fillColdWater(testData[index].coldWater, testData[0].loadsPerWeek).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getColdWaterCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from the dryer replacement', () => {
      cy.fillAirDry(testData[index].airDry, testData[index].percentageAirDry).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getAirDryCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from ENERGY STAR Products - Refrigerator', () => {
      cy.fillFridge(testData[index].fridge).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getFridgeCo2Saved))).to.eq(this.newTotal)
          })
        })
      })
    })

    it('validate "Annual Savings" from ENERGY STAR Products - Windows', () => {
      cy.fillWindow(testData[index].window).then(function () {
        cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
          cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{
              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - utils.convertToNumber(this.getWindowCo2SavedLabel))).to.eq(this.newTotal)
          })
        })
      })
    })
  })


  context('regression tests', () => {
    Cypress._.times(testData.length, (i) => {
      it('complete home energy flow', () => {
  
          cy.completeHomeEnergySection(testData[i]).then(function () {   
          cy.get(reportSection.totalEmissionsLabel).invoke('text').as('currentTotal').then(()=> {
            cy.get(reportSection.newEmissionTotalLabel).invoke('text').as('newTotal').then(()=>{

              const sumCo2Saved =  
              utils.convertToNumber(this.getEnergyACCo2Saved) + 
              utils.convertToNumber(this.getEnergyHeatCo2Saved) +
              utils.convertToNumber(this.getLightEnergyCo2Saved) +
              utils.convertToNumber(this.getComputerPwrCo2Saved)+
              utils.convertToNumber(this.getIncreaseGreenCo2Saved) +
              utils.convertToNumber(this.getColdWaterCo2Saved) +
              utils.convertToNumber(this.getAirDryCo2Saved) +
              utils.convertToNumber(this.getFridgeCo2Saved) +
              utils.convertToNumber(this.getWindowCo2SavedLabel)

              expect(utils.formatNumber(utils.convertToNumber(this.currentTotal) - sumCo2Saved)).to.eq(this.newTotal)
            })
          })
        })
      })
    })
  })
  
})