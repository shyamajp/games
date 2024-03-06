abstract class CardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CardError";
  }
}

export class IllegalCardError extends CardError {
  constructor(message: string = "This card is illegal") {
    super(message);
    this.name = "IllegalCardError";
  }
}

export class NoCardsLeftError extends CardError {
  constructor(message: string = "No cards left") {
    super(message);
    this.name = "NoCardsLeftError";
  }
}

export class CardAlreadyExistsError extends CardError {
  constructor(message: string = "This card already exists") {
    super(message);
    this.name = "CardAlreadyExistsError";
  }
}

export class CardDoesNotExistError extends CardError {
  constructor(message: string = "This card does not exist") {
    super(message);
    this.name = "CardDoesNotExistError";
  }
}
