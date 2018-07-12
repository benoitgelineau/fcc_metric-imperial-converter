/*
*
*
*       Complete the handler logic below
*       
*       
*/

const round = require('../helpers/rounding');

function ConvertHandler() {
  
  this.getNum = function(input) {
    const firstCharIndex = input.search(/[A-Za-z]/g);
    const numRegex = /(\d+(\.\d+)?)(\/\d+(\.\d+))?/g;

    let result = input.slice(0, firstCharIndex);
    const isFraction = result.match(/\/+/g);

    if (!result) return 1;
    
    if (!numRegex.test(result)) return 'Invalid Number';

    if (isFraction) {
      if (isFraction.length > 1) {
        return 'Invalid Number';
      } else {
        const split = result.split("/");
        result = parseFloat(split[0]) / parseFloat(split[1]);
      }
    }

    return round(result, 5);
  };

  this.getUnit = function(input) {
    let result;
    const units = ["gal", "l", "mi", "km", "lbs", "kg"];
    const firstCharIndex = input.search(/[A-Za-z]/g);
    const unit = input.slice(firstCharIndex);

    if (units.indexOf(unit.toLowerCase()) == -1) {
      result = 'Invalid Unit';
    } else {
      result = unit;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const expect = ["l", "gal", "km", "mi", "kg", "lbs"];

    result = expect[input.indexOf(initUnit)];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];

    result = expect[input.indexOf(unit)];

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const metric = ["l", "kg", "km"];
    const imperial = ["gal", "lbs", "mi"];
    const mIndex = metric.indexOf(initUnit);
    const iIndex = imperial.indexOf(initUnit);
    let index, conv, result;

    index = (mIndex !== -1) ? mIndex : iIndex;

    switch (index) {
      case 0:
        conv = (index === mIndex) ? (1 / galToL) : galToL;
        break;
      case 1:
        conv = (index === mIndex) ? (1 / lbsToKg) : lbsToKg;
        break;
      case 2:
        conv = (index === mIndex) ? (1 / miToKm) : miToKm;
        break;
      }

    result = round(conv * initNum, 5);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}.`;
    return result;
  };
  
}

module.exports = ConvertHandler;
