/**
 * root -
 *
 * we define a set of tests that will ensure that the root definition or injection manager is able to run properly
 * without referencing a parent class first
 * */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { module } from '../lib/module';

import Root from '../lib/root';

describe('Root', () => {
    // we define a root instance and start getting down the expectation of the root class
    it('should be able to construct safely without dependencies', () => {
        return new Root();
    });
    it('should have a modules array', () => {
        const root = new Root();
    });
    it('should have a function called initialize', () => {
        const root = new Root();

        return expect(root.initialize).to.not.be.undefined;
    });
    it('should run graph construction when calling initialize', () => {
        const root = new Root();

        @module({
            modules: [],
        })
        class App {}

        return root.initialize(App);
    });
    it('should be able to iterate the options object with multiple modules', () => {
        const root = new Root();

        @module({
            modules: [],
        })
        class A {}

        @module({
            modules: [A],
        })
        class B {}

        return root.initialize(B);
    });
});
