import { Application, NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { BikerRouter } from '@/services/biker';

class Routes {
    private static router = Router()

    public static mountRoutes(express: Application): void {
        const apiPrefix = express.locals.app.apiPrefix;
        // Required headers and configs
        Routes.configureRoutes(express);
        // Test Route: 
        Routes.router.get("/health", (req: Request, res: Response) => { res.json("The server is Healthy!") });
        // Use services routers: 
        Routes.useRouters();
        // SET API PREFIX: 
        express.use(apiPrefix, Routes.router);
    }

    private static configureRoutes(express: Application) {
        // Body Parser Settings: 
        express.use(bodyParser.json());
        // Required Headers: 
        express.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            next();
        });
    }

    private static useRouters() {
        // Biker: 
        const bikerRouter = new BikerRouter();
        Routes.router.use(bikerRouter.getPrefix, bikerRouter.getRoutes);
    }
}

export default Routes;