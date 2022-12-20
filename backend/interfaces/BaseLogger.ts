export default interface BaseLogger {
    info(string: string): void,
    warn(string: string): void,
    error(string: string): void,
}