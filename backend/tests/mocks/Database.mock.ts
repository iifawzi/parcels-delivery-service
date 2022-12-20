import { BaseDatabase } from "@/interfaces";

export default class DatabaseMock implements BaseDatabase {
    getConnection(): void {
        // nothing;
    }

}