/**
 * root -
 *
 * we define a set of tests that will ensure that the root definition or injection manager is able to run properly
 * without referencing a parent class first
 * */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { injectable, module, Injectable } from '../lib';

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

    it('should be able to setup and configure the provider classes', () => {
        @injectable()
        class B {}

        @module({
            providers: [B],
        })
        class A extends Injectable {}

        const a = new A();
        // so since the properties are added to the module class, we should expect the instance a to have a property
        // providers with a class type B as the first element
        expect(a.providers[0]).to.be.equal(B);
    });

    it('should be able to work the root instance to run instantiation of providers', () => {
        const root = new Root();

        @injectable()
        class B {}

        @module({
            providers: [B],
        })
        class A extends Injectable {}

        root.initialize(A);
    });
});
