/// <reference types="Cypress" />

'use strict'

let Utils = function(){

    this.convertToNumber = function(number){
        return parseInt(number.replace(',', ''))
    }

    this.formatNumber = function(number){
        return Number(number).toLocaleString('en-US')
    }
}
export default Utils