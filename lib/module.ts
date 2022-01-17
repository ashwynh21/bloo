/**
 * module -
 *
 * We now define an interface that will layout the module structure that will allow us to build support for
 * dependency injection. generally speaking we need to create a module interface that will allow the user to
 * break their API into modules so that the routing tree structure can be achieved
 * */
import { Controller } from './controller';
import { Provider } from './provider';

export interface Module {
    // we define a name for a module which should essentially be the name of the route that the module will take on
    readonly name: string;

    // so a module should have other module children arranged in a list
    modules?: Array<Module>;
    // a module will then have a list of controllers that will rollup bind to the root server that runs at the app
    // root
    controllers?: Array<Controller>;

    // we allow a module to provide services that are injectable to the application root. this will require us to
    // define a decorator that will mark a class as injectable
    providers?: Array<Provider>;

    // we define the constructor
    new: () => Module;
}
