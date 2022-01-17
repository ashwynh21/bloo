/*
 * bloo.spec -
 *
 * we define tests for the Bloo instance class
 * */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Bloo } from '../lib';

describe('Bloo', () => {
    it('should safely create Bloo instance', () => {
        return new Bloo();
    });

    // we define a scope for the following expectations since they are related
    {
        const bloo = new Bloo();

        it('should be able to call listen', () => {
            return bloo.listen(3000);
        });

        it('should be able to stop when called', () => {
            return bloo.close();
        });
    }
});
