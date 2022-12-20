import { BaseApp } from './interfaces';
export default class Server {

    private static serverInstance: Server;
    private constructor(private app: BaseApp) {
        this.app = app;
    };

    public static createInstance(app: BaseApp): Server {
        if (!Server.serverInstance) {
            Server.serverInstance = new Server(app);
        }
        return Server.serverInstance;
    }

    public get getApp() {
        return this.app.getInstance;
    }
}

