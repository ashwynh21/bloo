
/**
 * bloo -
 *
 * we define a class called Bloo which the main application class for the entire application.
 *
 * since we expect the class to work as a normal server we are going to need to get the listen
 * function running on this class
 *
 * @method listen(port?: number): Promise<void> - for listening and starting the server instance on a port number
 * @method constructor(options?: Options);
 *
 * */
export class Bloo {
    constructor(private options?: Options) {
    }

    async listen(port?: number) {
        throw Error('Method Not Implmented');
    }
}

/**
 * The options interface outlines the parameters that can be configured into the class
 * */
export interface Options {
    host?: string;
    port?: number;
}
