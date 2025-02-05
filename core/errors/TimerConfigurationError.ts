export class TimerConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimerConfigurationError";
    Object.setPrototypeOf(this, TimerConfigurationError.prototype);
  }
}
