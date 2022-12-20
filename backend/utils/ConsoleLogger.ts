import { BaseLogger } from "@/interfaces";

class ConsoleLogger implements BaseLogger {
    public info(string: string): void {
        this.addLog('INFO', string);
    }

    public warn(string: string): void {
        this.addLog('WARN', string);
    }

    public error(string: string): void {
        this.addLog('ERROR', string);
    }

    private addLog(kind: string, string: string): void {
        const today: Date = new Date();
        const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
        let timeString = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        const linePrefix = `[${dateString} ${timeString}]`;
        console.log(`${linePrefix} [${kind}] ${string}\n`);
    }
}

export default ConsoleLogger; 
