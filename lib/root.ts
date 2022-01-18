/**
 * root -
 *
 * we define the class Root that will be responsible for managing and maintaining the injection engine of the rest of the
 * app.
 * */
import { Bloo } from './bloo';
import { Class, Module } from './module';
import { Provider } from './provider';

export default class Root {
    // we are going to need to define a module array that will be responsible for storing the injection mechanic
    private modules: Record<string, Module> = {};

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
        // such. but first let us replace the modules with pointers
        Object.values(this.modules).forEach((m) => {
            m.modules = m.modules?.map((c) => {
                return this.modules[c.name] as any;
            });
        });
    }
    /**
     * a function that initializes the modules injection structure of the application
     * */
    private modularize(module: Class<Module>) {
        // we should then push the constructor into the modules property for construction and injection later
        if (!this.modules[module.name as string]) {
            const instance = new module();
            // at this point we are going to need to deal with the providers and the controllers of the module
            // so we will define separate functions.
            this.injectables(instance);

            this.modules[module.name as string] = instance;

            (instance.modules ?? []).map((m) => this.modularize(m));
        }
    }

    /**
     * So we set the rules to say that an injectable should only inject into one module so that we can prevent
     * duplication of the providable hence the providable instantiation should be able to run properly
     * */
    private injectables(module: Module) {
        // since the instance provided in the args will be the one instance provided of the class definition hence
        // we should be able to proceed to running the provider construction
        module.providers = module.providers?.map((p) => new (p as Class<Provider>)());
    }
}
