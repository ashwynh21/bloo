/**
 * provider -
 *
 * we define the test set for the provider so that we are able to explore the functionality that we should be able to
 * add to the decorator
 * */
import { describe, it } from 'mocha';
import { injectable } from '../lib';
import { expect } from 'chai';

describe('Provider', () => {
    it('should be able to decorate without issues', () => {
        @injectable()
        class A {}

        const a = new A();
        expect(a.hasOwnProperty('type')).to.be.true;
    });

    // so now we need to work on the instantiation and injection mechanics which are in the root tests
});
