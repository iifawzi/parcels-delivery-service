import { BaseLogger } from "@/interfaces";

class TestLogger implements BaseLogger {
    public info(string: string): void {
    }

    public warn(string: string): void {
    }

    public error(string: string): void {
    }

    private addLog(kind: string, string: string): void {
    }
}

export default TestLogger; 
