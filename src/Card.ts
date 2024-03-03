enum Suite {
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
  NONE,
}

enum SuiteSymbols {
  "♣",
  "♦",
  "♥",
  "♠",
}

export class Card {
  readonly raw: number;
  readonly suite: Suite | string;
  readonly num: number | string;

  constructor(raw: number) {
    this.raw = raw;
    this.suite = this.getSuite();
    this.num = this.getNumber();
  }

  getSuite(pretty: boolean = false) {
    if (this.raw > 51) {
      return "";
    }
    const suite = Math.floor(this.raw / 13);
    if (pretty) {
      return SuiteSymbols[suite];
    }
    return Suite[suite];
  }

  getNumber(pretty: boolean = false) {
    if (this.raw > 51) {
      return "Joker";
    }
    if (pretty) {
      switch ((this.raw % 13) + 1) {
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
    return (this.raw % 13) + 1;
  }

  display() {
    const n = this.getNumber(true);
    const suite = this.getSuite(true);
    return `${suite}${n}`;
  }
}
