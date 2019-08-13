'use strict';

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  isString(input) {
    return typeof input === 'string';
  }

  isObject(input) {
    return typeof input === 'object';
  }

  isArray(input, valueType) {
    if (Array.isArray(input)) {
      return input.reduce((acc, value) => {
        return typeof value === valueType ? true : false
      }, true)
    } else {
      return false;
    }
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isNumber(input) {
    return typeof input === 'number';

  }

  isFunction(input) {
    return typeof input === 'function';

  }

  isTruthy(input) {
    if (input)
      return true;
    else
      return false;
  }


  isValid(data) {
    return Object.keys(this.schema.fields).reduce((acc, expectedProperty) => {
      if (!data.hasOwnProperty(expectedProperty)) {
        acc = false;
      }
      if (typeof data[expectedProperty] !== this.schema.fields[expectedProperty].type) {
        acc = false;
      }
      return acc;
    }, true)
  }

}

module.exports = Validator;
