export class MatchValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MatchValidationError"
        Object.setPrototypeOf(this, MatchValidationError.prototype)
    }
}