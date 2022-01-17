/**
 * root -
 *
 * we define the class Root that will be responsible for managing and maintaining the injection engine of the rest of the
 * app.
 * */
import { Bloo } from './bloo';
import { Class, Module } from './module';

export default class Root {
    // we are going to need to define a module array that will be responsible for storing the injection mechanic
    private modules: Set<Module> = new Set();

    /**
     * The class is going to require a context to operate from since it is going to binding the modules and controllers
     * and providers to the class, so it is going to need a reference to the servers
     *
     * @param bloo?: Bloo
     * */
    constructor(private bloo?: Bloo) {}

    initialize(module: Class<Module>) {
        // so now we have the module instances in a set. with the structure and the instance set, we should have
        // a way to traverse and bind the module controllers and providers
        this.modularize(module);
        // with the modules initialized into a set we then need to check how we work each modules controller and
        // such
    }
    /**
     * a function that initializes the modules injection structure of the application
     * */
    private modularize(module: Class<Module>) {
        // we should then push the constructor into the modules property for construction and injection later
        const instance = new module();
        this.modules.add(instance);

        (instance.modules ?? []).map((m) => this.modularize(m));
    }
}
