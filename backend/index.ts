import 'module-alias/register';
import "reflect-metadata"
import { App } from "./providers";
import Server from "./server";
import { container } from "tsyringe";
import { regesterProductionDependencies, regesterTestDependencies } from './di/';

// Inject dependencies: 
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'integration-coverage') {
    regesterProductionDependencies();
} else {
    regesterTestDependencies();
}

const app = container.resolve(App);
// Server creation: 
const serverInstance = Server.getServer(app);
export default serverInstance;