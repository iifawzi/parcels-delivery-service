import * as mongoose from 'mongoose';
import Locals from './Locals';
import { BaseDatabase, BaseLogger } from '@/interfaces';
import { inject, injectable } from 'tsyringe';

@injectable()
export class Database implements BaseDatabase {
    private instanceCreated = false;
    constructor(@inject('logger') private logger: BaseLogger) {
        this.logger = logger;
    }

    private createConnection(): any {
        const connectURI = Locals.config().MONGO_URL;
        mongoose.connect(connectURI, (error: mongoose.CallbackError) => {
            if (error) {
                this.logger.info('Failed to connect to the Mongo server!!');
                throw error;
            } else {
                this.logger.info('connected to mongo server at: ' + connectURI);
            }
        });
    };

    public getConnection() {
        if (!this.instanceCreated) {
            this.createConnection();
            this.instanceCreated = true;
        }
        return mongoose;
    }
}

export default mongoose;
