'use strict';

const Validator = require('../validator');

const schema = {
  fields: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    hair: { type: 'object' },
    favoriteFoods: { type: 'object' },
    married: { type: 'boolean' },
    kids: { type: 'number' }
  },
};

const validator = new Validator(schema);

describe('#validator', () => {
  describe('#isString', () => {
    test('regular cases', () => {
      expect(validator.isString('happy')).toEqual(true);
      expect(validator.isString(5)).toEqual(false);
      expect(validator.isString([])).toEqual(false);
      expect(validator.isString({})).toEqual(false);
    });
  });

  describe('#isObject', () => {
    test('regular cases', () => {
      expect(validator.isObject('happy')).toEqual(false);
      expect(validator.isObject(5)).toEqual(false);
      expect(validator.isObject([])).toEqual(true);
      expect(validator.isObject({})).toEqual(true);
    });
  });

  describe('#isArray', () => {
    test('regular cases', () => {
      expect(validator.isArray('happy')).toEqual(false);
      expect(validator.isArray(5)).toEqual(false);
      expect(validator.isArray([1, 2, 6, 7, 88], 'number')).toEqual(true);
      expect(validator.isArray(['', 'happy', 'sad'], 'string')).toEqual(true);
      expect(validator.isArray(['', 'happy', 'sad'], 'object')).toEqual(false);
      expect(validator.isArray([6, 'happy', 'sad'], 'number')).toEqual(false);
    });
  });

  describe('#isBoolean', () => {
    test('regular cases', () => {
      expect(validator.isBoolean('happy')).toEqual(false);
      expect(validator.isBoolean(5)).toEqual(false);
      expect(validator.isBoolean(false)).toEqual(true);
      expect(validator.isBoolean(true)).toEqual(true);
    });
  });

  describe('#isNumber', () => {
    test('regular cases', () => {
      expect(validator.isNumber('happy')).toEqual(false);
      expect(validator.isNumber(5)).toEqual(true);
      expect(validator.isNumber(false)).toEqual(false);
      expect(validator.isNumber({})).toEqual(false);
    });
  });

  describe('#isFunction', () => {
    test('regular cases', () => {
      expect(validator.isFunction('happy')).toEqual(false);
      expect(validator.isFunction(5)).toEqual(false);
      expect(validator.isFunction(false)).toEqual(false);
      expect(validator.isFunction(() => { })).toEqual(true);
    });
  });

  describe('#isTruthy', () => {
    test('regular cases', () => {
      expect(validator.isTruthy(6)).toEqual(true);
      expect(validator.isTruthy('false')).toEqual(true);
      expect(validator.isTruthy(new Date())).toEqual(true);
      expect(validator.isTruthy({})).toEqual(true);
      expect(validator.isTruthy(null)).toEqual(false);
      expect(validator.isTruthy(0)).toEqual(false);
      expect(validator.isTruthy(false)).toEqual(false);
    });
  });

  describe('#isObjectValid', () => {
    test('regular cases', () => {
      const validObj = {
        firstName: "Fred",
        lastName: "Sample",
        hair: {
          type: "wavy",
          color: "brown"
        },
        favoriteFoods: ["pizza", "cupcakes", "salmon"],
        married: true,
        kids: 3
      }
      const invalidObj1 = {
        firstName: "Fred",
        lastName: 5,
        hair: {
          type: "wavy",
          color: "brown"
        },
        favoriteFoods: 5,
        married: 'happy',
        kids: 3
      }
      const invalidObj2 = {
        firstName: "Fred",
        lastName: "Sample",
        favoriteFoods: ["pizza", "cupcakes", "salmon"],
        married: true,
        kids: 3
      }

      expect(validator.isValid(validObj)).toEqual(true);
      expect(validator.isValid(invalidObj1)).toEqual(false);
      expect(validator.isValid(invalidObj2)).toEqual(false);

    });
  });
});



