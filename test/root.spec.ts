/**
 * root -
 *
 * we define a set of tests that will ensure that the root definition or injection manager is able to run properly
 * without referencing a parent class first
 * */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import Root from '../lib/root';

describe('Root', () => {
    // we define a root instance and start getting down the expectation of the root class
    it('should be able to construct safely without dependencies', () => {
        return new Root();
    });
    it('should have a modules array', () => {
        const root = new Root();

        return expect(root.modules.length).to.not.be.NaN;
    });
    it('should have a function called initialize', () => {
        const root = new Root();

        return expect(root.initialize).to.not.be.undefined;
    });
});
