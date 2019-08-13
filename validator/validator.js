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
        return value === valueType ? true : false
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
    Object.keys(this.schema.fields).forEach(expectedProperty => {
      if (!data.hasOwnProperty(expectedProperty)) {
        return false;
      }
      if (typeof data[expectedProperty] !== schema.fields[expectedProperty].type) {
        return false;
      }
    })
    return true;
  }

}

module.exports = Validator;
