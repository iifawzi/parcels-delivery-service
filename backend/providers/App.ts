import { BaseApp, BaseDatabase, BaseLogger } from "@/interfaces";
import * as path from 'path';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import Locals from "./Locals";
import Routes from "./Routes";
import { BaseError, handleError } from "./ErrorHandler";
import { inject, injectable } from "tsyringe";
@injectable()
export default class App implements BaseApp {

    private instance: express.Application;
    constructor(@inject('logger') private logger: BaseLogger, @inject('database') private database: BaseDatabase) {
        this.logger = logger;
        this.database = database;
        this.loadConfiguration();
        this.loadDatabase();
        this.instance = this.loadServer();
        this.configureApp();
    }

    private loadConfiguration(): void {
        this.logger.info("Configuration :: Loading");
        dotenv.config({ path: path.join(__dirname, '../.env') });
    }

    private loadDatabase(): void {
        this.logger.info("Database :: Loading");
        this.database.getConnection();
    }

    private loadServer(): express.Application {
        this.logger.info("Server :: Loading");
        const expressApp = express();
        return expressApp;
    }

    private configureApp() {
        // Set configs in locals
        this.instance = Locals.init(this.instance);
        // Mounting the routes: 
        Routes.mountRoutes(this.instance);
        // Global error handling: 
        this.instance.use((err: BaseError, _: Request, res: Response, next: NextFunction) => {
            handleError(err, res, next);
        });
    }

    public get getInstance(): express.Application {
        return this.instance;
    }
}