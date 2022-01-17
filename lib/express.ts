/**
 * express -
 *
 * A function to return an instance of an express server
 * */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export default (options: Partial<Options> = { limit: '512kb' }) => {
    // here we can customize the express instance at will
    return express()
        .use(express.json(options))
        .use(express.urlencoded({ ...options, extended: true }))
        .use(cors)
        .use(helmet);
};

interface Options {
    limit: `${number}${'kb' | 'mb' | 'gb'}`;
}
