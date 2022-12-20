import { BaseApp, BaseLogger } from "@/interfaces";
import * as path from 'path';
import * as dotenv from 'dotenv';
import express from "express";

export default class App implements BaseApp {
    
    private instance: express.Application;
    constructor(private logger: BaseLogger) {
        this.logger = logger;
        this.loadConfiguration();
        this.loadDatabase();
        this.instance = this.loadServer();
    }

    private loadConfiguration(): void {
        this.logger.info("Configuration :: Loading");
        dotenv.config({ path: path.join(__dirname, '../.env') });
    }
    
    private loadDatabase(): void {
        this.logger.info("Database :: Loading");
        // to be implemented;
    }
    
    private loadServer(): express.Application {
        this.logger.info("Server :: Loading");
        const expressApp = express();
        return expressApp;
    }

    public get getInstance(): express.Application {
        return this.instance;
    }
    
}