import 'module-alias/register';
import "reflect-metadata"
import http from "http"
import { App } from "./providers";
import Server from "./server";
import { container } from "tsyringe";

// Inject dependencies: 
import "./di/production"
const app = container.resolve(App);

// Server creation: 
const serverInstance = Server.createInstance(app);
const port = process.env.PORT || 4040;
const server = http.createServer(serverInstance.getApp);
server.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});

export default server;