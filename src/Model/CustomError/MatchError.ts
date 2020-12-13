import { CustomError } from './CustomError';

class MatchError extends CustomError {
  constructor(chatId: number, m: string = 'Failed parsing regex') {
    super(chatId, m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MatchError.prototype);
  }
}

export { MatchError };
