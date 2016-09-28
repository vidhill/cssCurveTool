/* global describe, it, expect */

import helpers from './helpers';

describe('test', ()=>{
    it('works', ()=>{
        expect(helpers.isObject({})).to.be.true;
    });
    it('works as well', ()=>{
        expect(helpers.isObject).to.exist;
    });
});
