export enum SUITES {
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
}

export enum SUITES_SYMBOLS {
  "♣",
  "♦",
  "♥",
  "♠",
}

export class Card {
  readonly card: number;
  readonly suite: SUITES;
  readonly num: number | string;

  constructor(c: number) {
    this.card = c;
    this.suite = Math.floor(c / 13);
    this.num = (c % 13) + 1;
  }

  getSuite(pretty: boolean = false) {
    if (pretty) {
      return SUITES_SYMBOLS[this.suite];
    }
    return this.suite;
  }

  getNumber(pretty: boolean = false): number | string {
    if (this.card > 51) {
      return "Joker";
    }
    if (pretty) {
      switch ((this.card % 13) + 1) {
        case 1:
          return "A";
        case 11:
          return "J";
        case 12:
          return "Q";
        case 13:
          return "K";
      }
    }
    return (this.card % 13) + 1;
  }

  display() {
    const n = this.getNumber(true);
    const suite = this.getSuite(true);
    if (n === "Joker") {
      return "Joker";
    }
    return `${suite}${n}`;
  }
}
