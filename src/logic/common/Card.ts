enum Suite {
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
  NONE,
}

enum SuiteSymbol {
  "♣",
  "♦",
  "♥",
  "♠",
}

enum PictureCard {
  A = 1,
  J = 11,
  Q = 12,
  K = 13,
  Joker = 52,
}

type PrettySuite = keyof typeof SuiteSymbol;
type PrettyCard = keyof typeof PictureCard;

enum AccessLevel {
  NONE,
  SELF,
  ALL,
}

export class Card {
  readonly raw;
  readonly suite;
  readonly rank;
  accesslevel: AccessLevel;

  constructor(raw: number) {
    this.raw = raw;
    this.suite = this.getSuite(false);
    this.rank = this.getRank(false);
    this.accesslevel = AccessLevel.NONE;
  }

  getSuite(pretty: false): Suite | undefined;
  getSuite(pretty: true): PrettySuite | undefined;
  getSuite(pretty: boolean = false) {
    if (this.raw > 51) return undefined;
    let suite: Suite | PrettySuite = Math.floor(this.raw / 13);
    if (pretty) suite = SuiteSymbol[suite] as PrettySuite;
    return suite;
  }

  getRank(pretty: false): number;
  getRank(pretty: true): number | PrettyCard;
  getRank(pretty: boolean = false) {
    if (this.raw >= PictureCard.Joker)
      return pretty ? PictureCard[PictureCard.Joker] : 0;
    const rank = (this.raw % 13) + 1;
    if (pretty && rank in PictureCard) return PictureCard[rank] as PrettyCard;
    return rank;
  }

  getColor(): string {
    if (this.suite === Suite.DIAMONDS || this.suite === Suite.HEARTS)
      return "red";
    return "black";
  }

  display() {
    const rank = this.getRank(true);
    const suite = this.getSuite(true) ?? "";
    return `${suite}${rank}`;
  }
}
