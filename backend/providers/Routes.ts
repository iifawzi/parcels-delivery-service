import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from '../routes';

class Routes {
    public static mountRoutes(express: Application): Application {
        const apiPrefix = express.locals.app.apiPrefix;

        // Body Parser Settings: 
        express.use(bodyParser.json());
        // Required Headers: 
        express.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            next();
        });

        return express.use(apiPrefix, router);
    }
}

export default Routes;