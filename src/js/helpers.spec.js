/* eslint-env jasmine */

import helpers from './helpers';

describe('The \'isObject\' method', () => {
    it('should return true for an empty object', () => {
        expect(helpers.isObject({})).toBe(true);
    });
    it('should return false for undefined', () => {
        expect(helpers.isObject(undefined)).toBe(false);
    });
    it('works as well', () => {
        expect(helpers.isObject).not.toBeUndefined();
    });
});
