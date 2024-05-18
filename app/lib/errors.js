export class InvalidChallengeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidChallengeError';
  }
}
