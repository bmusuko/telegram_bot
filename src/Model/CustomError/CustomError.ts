class CustomError extends Error {
  chatId: number;

  constructor(chatId: number, m: string) {
    super(m);
    this.chatId = chatId;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export { CustomError };
