/**
 * bloo -
 *
 * We define a class called Bloo which the main application class for the entire application.
 *
 * since we expect the class to work as a normal server we are going to need to get the listen
 * function running on this class
 *
 * @method listen(port?: number): Promise<void> - for listening and starting the server instance on a port number
 * @method constructor(options?: Options);
 *
 * */
import http from 'http';
import https from 'https';
import express from './express';
import root from './root';

export class Bloo {
    private readonly server: http.Server | https.Server;
    private readonly express: ReturnType<typeof express>;

    // we define a property that will allow us to manage the injection environment of the application
    private root = new root(this);

    constructor(private options?: Partial<Options>) {
        this.express = express(options);
        this.server = http.createServer(this.express);

        // so we are going to need to make sure that before the listen function is called that we are able to init
        // the modules and tree structure within the instance root property.
    }

    /**
     * To start the bloo server instance
     *
     * @param port: number - port number for the server to start on
     * */
    async listen(port?: number) {
        // we check if the port is defined
        if (!port) {
            // then the class instance should have a port defined
            if (!this.options?.port) {
                // then there is an issue and the port should be defined
                throw Error('Port Number Undefined');
            } else {
                return this.server.listen(this.options.port);
            }
        } else {
            // first store the port number for later use by the dev
            this.options = { ...this.options, port };
            // then start listening
            return this.server.listen(port);
        }
    }

    /**
     * To stop the application serer from running and pretty much stop the application
     * */
    close() {
        return this.server.close();
    }

    /**
     * To add extra configurations to the application instance
     *
     * @param callback: (bloo: Bloo) => void - the callback function that the method is going to call
     * */
    run(callback: Callable) {
        callback(this);

        return this;
    }
}

/**
 * The options interface outlines the parameters that can be configured into the class
 * */
interface Options {
    host: string;
    port: number;

    // specify the kind of server that you would like to use. i.e. express, koa, or otherwise
    limit: `${number}${'kb' | 'mb' | 'gb'}`;
}

// we define the types that will be local for the class definition
type Callable = (bloo: Bloo) => void;
