import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { BaseError } from './ErrorHandler';


class Routes {
    public static mountRoutes(express: Application): Application {
        const apiPrefix = express.locals.app.apiPrefix;
        express.use(bodyParser.json());
        express.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            next();
        });
        return express.use(`/${apiPrefix}/test`, (req: any, res: any, next: any) => {
            throw new BaseError(500,"testing");
        });
    }
}

export default Routes;