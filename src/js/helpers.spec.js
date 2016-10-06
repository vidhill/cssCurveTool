/* eslint-env jasmine */

import helpers from './helpers';

describe('The \'isObject\' method', () => {
    it('should exist as a method', () => {
        expect(helpers.isObject).toEqual(jasmine.any(Function));
    });
    it('should return true for an empty object', () => {
        expect(helpers.isObject({})).toBe(true);
    });
    it('should return false for undefined', () => {
        expect(helpers.isObject(undefined)).toBe(false);
    });
});

describe('The \'decimalToPercentage\' method', () => {
    it('should exist as a method', () => {
        expect(helpers.decimalToPercentage).toEqual(jasmine.any(Function));
    });

    it('should convert a decimal to a percentage to two decimal places', () => {
        expect(helpers.decimalToPercentage(0.3333333)).toBe('33.33%');
        expect(helpers.decimalToPercentage(0.25)).toBe('25.00%');
        expect(helpers.decimalToPercentage(0.125)).toBe('12.50%');
    });
});

describe('The \'toSpacedString\' method', () => {
    it('should exist as a method', () => {
        expect(helpers.toSpacedString).toEqual(jasmine.any(Function));
    });

    it('should join any length of arguments into a spaced string', () => {
        expect(helpers.toSpacedString(12, 10)).toBe('12 10');
        expect(helpers.toSpacedString(12)).toBe('12');
        expect(helpers.toSpacedString('foo', 'bar')).toBe('foo bar');
        expect(helpers.toSpacedString('foo', 'bar', 'whizz', 'cat', 'meow')).toBe('foo bar whizz cat meow');        
    });
});
