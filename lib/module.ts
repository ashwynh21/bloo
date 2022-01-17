/**
 * module -
 *
 * We now define an interface that will layout the module structure that will allow us to build support for
 * dependency injection. generally speaking we need to create a module interface that will allow the user to
 * break their API into modules so that the routing tree structure can be achieved
 * */
import { Controller } from './controller';
import { Provider } from './provider';

import 'reflect-metadata';

export interface Module {
    // we allow a module to have a name so that we can bind the name to the server router
    name?: string;

    // so a module should have other module children arranged in a list
    modules?: Array<Module>;

    // a module will then have a list of controllers that will rollup bind to the root server that runs at the app
    // root
    controllers?: Array<Controller>;

    // we allow a module to provide services that are injectable to the application root. this will require us to
    // define a decorator that will mark a class as injectable
    providers?: Array<Provider>;
}

/**
 * A decorator that is used on classes. Allows the class to be added to the Bloo injection engine as a Module which
 * will be providing features to the rest of the application
 * */
export function module<T extends { new (...args: any[]): any }>(options: Module) {
    // so in this decorator we want to redefine the class as an injectable class first. then we want to be able
    // to make it attachable to the application, that means providing the properties above to it so that it can be
    // bound up properly
    return function (constructor: T) {
        // so at this point we are going to need to define the constructor as part of the metadata in the decorator
        // so that we are able to construct the class directly from the metadata.
        Reflect.defineMetadata('options', options, constructor);

        return constructor;
    };
}
