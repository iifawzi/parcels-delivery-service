import http from "http"
import { App } from "./providers";
import Server from "./server";
import { ConsoleLogger } from "./utils";

// Dependencies: 
const logger = new ConsoleLogger();
const app = new App(logger);
const serverInstance = Server.createInstance(app);

// Server creation: 
const port = process.env.PORT || 4040;
const server = http.createServer(serverInstance.getApp);
server.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});

export default server;