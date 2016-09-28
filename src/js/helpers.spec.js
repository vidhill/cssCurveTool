/* global describe, it, expect */

import helpers from './helpers';

describe('test', ()=>{
    it('should return true for an empty object', ()=>{
        expect(helpers.isObject({})).to.be.true;
        expect(helpers.isObject(undefined)).to.be.false;
    });
    it('works as well', ()=>{
        expect(helpers.isObject).to.exist;
    });
});
