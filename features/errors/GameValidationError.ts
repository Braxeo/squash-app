export class GameValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GameValidationError"
        Object.setPrototypeOf(this, GameValidationError.prototype)
    }
}