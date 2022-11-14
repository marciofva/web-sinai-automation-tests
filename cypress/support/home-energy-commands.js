// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
/// <reference types="Cypress" />

import homePage from '../page-objects/home-page'
import reportSection from '../page-objects/report-section'
import homeEnergySection from '../page-objects/home-energy-section'
import Utils from './helper'

let utils = new Utils()


Cypress.Commands.add('getStarted', (data) => {
    cy.get(homePage.numberOfPeopleInput).focus().clear().type(data.numberOfPeople)
    cy.get(homePage.zipcodeInput).focus().clear().type(data.zipcode)
    cy.get(homePage.startButton).click()
    cy.get(reportSection.viewButton).should('be.visible')
})


Cypress.Commands.add('currentEmissions', (heatingSource, naturalGas, eletricity, fuelOil, propane) => {
    cy.get(homeEnergySection.heatingSourceSelect).select(heatingSource).should('have.value', heatingSource)

    cy.get(homeEnergySection.naturalGasInput).focus().clear().type(naturalGas[0])
    cy.get(homeEnergySection.naturalGasSelect).select(naturalGas[1]).should('have.value', naturalGas[1])

    cy.get(homeEnergySection.electricityInput).focus().clear().type(eletricity[0])
    cy.get(homeEnergySection.electricitySelect).select(eletricity[1]).should('have.value', eletricity[1])

    cy.get(homeEnergySection.fuelInput).focus().clear().type(fuelOil[0])
    cy.get(homeEnergySection.fuelSelect).select(fuelOil[1]).should('have.value', fuelOil[1])

    cy.get(homeEnergySection.propaneInput).focus().clear().type(propane[0])
    cy.get(homeEnergySection.propaneSelect).select(propane[1]).should('have.value', propane[1])
})


Cypress.Commands.add('ReduceEmissions',(energyAC, energyHeat, lightEnergy, computerPwr, increaseGreen, coldWater, loadsPerWeek, airDry, percentageAirDry, fridge, window) => {
    cy.fillEnergyAC(energyAC)
    cy.fillEnergyHeat(energyHeat)
    cy.fillLightEnergy(lightEnergy)
    cy.fillComputerPwr(computerPwr)
    cy.fillIncreaseGreen(increaseGreen)
    cy.fillColdWater(coldWater, loadsPerWeek)
    cy.fillAirDry(airDry, percentageAirDry)
    cy.fillFridge(fridge)
    cy.fillWindow(window)
})


Cypress.Commands.add('fillEnergyAC', (energyAC) => {
    cy.get(homeEnergySection.energyACInput).focus().clear().type(energyAC)
    cy.get(homeEnergySection.energyACCo2SavedLabel).first().invoke('text').as('getEnergyACCo2Saved')
})


Cypress.Commands.add('fillEnergyHeat', (energyHeat) => {
    cy.get(homeEnergySection.energyHeatInput).focus().clear().type(energyHeat)
    cy.get(homeEnergySection.energyHeatCo2SavedLabel).first().invoke('text').as('getEnergyHeatCo2Saved')
})


Cypress.Commands.add('fillLightEnergy', (lightEnergy) => {
    cy.get(homeEnergySection.lightEnergyInput).focus().clear().type(lightEnergy)
    cy.get(homeEnergySection.lightEnergyCo2SavedLabel).first().invoke('text').as('getLightEnergyCo2Saved')
})


Cypress.Commands.add('fillComputerPwr', (computerPwr) => {
    cy.get(homeEnergySection.computerPwrSelect).select(computerPwr).should('have.value', computerPwr)
    cy.get(homeEnergySection.computerPwrCo2SavedLabel).first().invoke('text').as('getComputerPwrCo2Saved')
})


Cypress.Commands.add('fillIncreaseGreen', (increaseGreen) => {
    cy.get(homeEnergySection.increaseGreenInput).focus().clear().type(increaseGreen)
    cy.get(homeEnergySection.increaseGreenCo2SavedLabel).first().invoke('text').as('getIncreaseGreenCo2Saved')
})


Cypress.Commands.add('fillColdWater', (coldWater, loadsPerWeek) => {
    cy.get(homeEnergySection.coldWaterSelect).select(coldWater).should('have.value', coldWater)
    cy.get(homeEnergySection.loadsPerWeekInput).focus().clear().type(loadsPerWeek)
    cy.get(homeEnergySection.coldWaterCo2SavedLabel).first().invoke('text').as('getColdWaterCo2Saved')
})


Cypress.Commands.add('fillAirDry', (airDry, percentageAirDry) => {
    cy.get(homeEnergySection.airDrySelect).select(airDry).should('have.value', airDry)
    cy.get(homeEnergySection.percentageAirDrySelect).select(percentageAirDry).should('have.value', percentageAirDry)
    cy.get(homeEnergySection.airDryCo2SavedLabel).first().invoke('text').as('getAirDryCo2Saved')
})


Cypress.Commands.add('fillFridge', (fridge) => {
    cy.get(homeEnergySection.fridgeSelect).select(fridge).should('have.value', fridge)
    cy.get(homeEnergySection.fridgeCo2SavedLabel).first().invoke('text').as('getFridgeCo2Saved')
})


Cypress.Commands.add('fillWindow', (window) => {
    cy.get(homeEnergySection.windowSelect).select(window).should('have.value', window)
    cy.get(homeEnergySection.windowCo2SavedLabel).first().invoke('text').as('getWindowCo2SavedLabel')
})


Cypress.Commands.add('completeHomeEnergySection', (data) => {
    cy.currentEmissions(
        data.primaryHeatingSource, 
        data.naturalGas.split('-'), 
        data.electricity.split('-'), 
        data.fuel.split('-'), 
        data.propane.split('-'))
    
    cy.ReduceEmissions(
        data.energyAC, 
        data.energyHeat, 
        data.lightEnergy, 
        data.computerPwr, 
        data.increaseGreen, 
        data.coldWater, 
        data.loadsPerWeek, 
        data.airDry, 
        data.percentageAirDry, 
        data.fridge, 
        data.window)
})
