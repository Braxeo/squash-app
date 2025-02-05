export class GameConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GameConfigurationError"
        Object.setPrototypeOf(this, GameConfigurationError.prototype)
    }
}