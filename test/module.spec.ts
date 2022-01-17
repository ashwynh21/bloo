/**
 * module -
 *
 * we define a set of tests that will set the expectations of the module mechanics
 * */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { module } from '../lib/module';

import 'reflect-metadata';

describe('Module', () => {
    it('should be able to define a class with the module decorator', () => {
        // so defining a class should not throw an error
        @module({
            name: 'test',
            modules: [],
            controllers: [],
        })
        class Test {}

        const options = Reflect.getOwnMetadata('options', Test);

        expect(options.modules).to.not.be.undefined;
        expect(options.controllers).to.not.be.undefined;
        expect(options.name).to.be.equal('test');
    });
});
