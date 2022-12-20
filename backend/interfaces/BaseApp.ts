export default interface BaseApp {
    loadConfiguration(): void;
    loadDatabase(): void;
    loadServer(): void;
}