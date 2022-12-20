import { Application } from 'express';

interface ConfigsI {
    apiPrefix: string,
    url: string,
    port: string,
    MONGO_URL: string
}

class Locals {
    private static config(): ConfigsI {
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 4040;
        const apiPrefix = process.env.API_PREFIX || 'api';
        const MONGO_URL = process.env.MONGO_URL;

        return {
            apiPrefix,
            url,
            port: port as string,
            MONGO_URL: MONGO_URL as string
        };
    }

    public static init(express: Application): Application {
        express.locals.app = this.config();
        return express;
    }
}

export default Locals;
