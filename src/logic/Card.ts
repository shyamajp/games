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

enum SpecialCard {
  A = 1,
  J = 11,
  Q = 12,
  K = 13,
  Joker = 52,
}

type PrettySuite = keyof typeof SuiteSymbol;
type PrettyCard = keyof typeof SpecialCard;

export class Card {
  readonly raw;
  readonly suite;
  readonly num;

  constructor(raw: number) {
    this.raw = raw;
    this.suite = this.getSuite(false);
    this.num = this.getNumber(false);
  }

  getSuite(pretty: false): Suite | undefined;
  getSuite(pretty: true): PrettySuite | undefined;
  getSuite(pretty: boolean = false) {
    if (this.raw > 51) return undefined;
    let suite: Suite | PrettySuite = Math.floor(this.raw / 13);
    if (pretty) suite = SuiteSymbol[suite] as PrettySuite;
    return suite;
  }

  getNumber(pretty: false): number | Extract<PrettyCard, "Joker">;
  getNumber(pretty: true): number | PrettyCard;
  getNumber(pretty: boolean = false) {
    if (this.raw >= SpecialCard.Joker) return SpecialCard[SpecialCard.Joker];
    let num: number | PrettyCard = (this.raw % 13) + 1;
    if (pretty && num in SpecialCard) num = SpecialCard[num] as PrettyCard;
    return num;
  }

  display() {
    const num = this.getNumber(true);
    const suite = this.getSuite(true) ?? "";
    return `${suite}${num}`;
  }
}
