export interface BikerRepositoryI {
    findBiker(username: string): Promise<any>
}