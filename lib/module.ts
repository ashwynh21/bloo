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
    modules?: Array<Class<Module>>;

    // a module will then have a list of controllers that will rollup bind to the root server that runs at the app
    // root
    controllers?: Array<Class<Controller> | Controller>;

    // we allow a module to provide services that are injectable to the application root. this will require us to
    // define a decorator that will mark a class as injectable
    providers?: Array<Class<Provider> | Provider>;
}

/**
 * A decorator that is used on classes. Allows the class to be added to the Bloo injection engine as a Module which
 * will be providing features to the rest of the application
 * */
export function module(options: Module) {
    // so in this decorator we want to redefine the class as an injectable class first. then we want to be able
    // to make it attachable to the application, that means providing the properties above to it so that it can be
    // bound up properly
    return function <T extends Class<Module>>(constructor: T) {
        return class extends constructor implements Module {
            name = options.name;

            controllers = options.controllers;
            providers = options.providers;
            modules = options.modules;

            type = 'module';
        };
    };
}

// we define some types here
export type Class<T = any> = { new (...args: any[]): T };

export class Type {
    type!: string;
}
