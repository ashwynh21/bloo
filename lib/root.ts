/**
 * root -
 *
 * we define the class Root that will be responsible for managing and maintaining the injection engine of the rest of the
 * app.
 * */
import { Bloo } from './bloo';
import { Module } from './module';

export default class Root {
    // we are going to need to define a module array that will be responsible for storing the injection mechanic
    modules: Array<Module> = [];

    /**
     * The class is going to require a context to operate from since it is going to binding the modules and controllers
     * and providers to the class, so it is going to need a reference to the servers
     *
     * @param bloo?: Bloo
     * */
    constructor(private bloo?: Bloo) {}

    /**
     * a function that initializes the modules injection structure of the application
     * */
    initialize() {}
}
