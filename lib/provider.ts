/**
 * provider -
 *
 * we define an interface that will allow the application root or modules to be able to get a definition of an injectable
 * property or class
 * */
import { Class } from './module';

export interface Provider {}

/**
 * in the provider we are going to need to define a way to define a class instance as providable so that devs are
 * able to inject custom class instances into a specific module
 * */
export function injectable(provider?: Provider) {
    return function (constructor: Class) {
        return class extends constructor {
            type = 'injectable';
        };
    };
}
