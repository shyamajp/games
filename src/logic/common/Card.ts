import { IllegalCardError } from "./Error";

export enum Color {
  RED = "red",
  BLACK = "black",
}

export enum Suit {
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
}

enum SuitSymbol {
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

export enum AccessLevel {
  NONE,
  SELF,
  ALL,
}

export class Card {
  readonly raw: number;
  private _accessLevel: AccessLevel;
  private _disabled: boolean;

  constructor(raw: number) {
    if (!(raw >= 0)) {
      throw new IllegalCardError();
    }
    this.raw = raw;
    this._accessLevel = AccessLevel.NONE;
    this._disabled = false;
  }

  get suit(): Suit | undefined {
    if (this.raw > 51) return undefined;
    return Math.floor(this.raw / 13);
  }

  get rank(): number {
    if (this.raw >= PictureCard.Joker) return 0;
    return (this.raw % 13) + 1;
  }

  get color(): Color {
    if (this.suit === Suit.DIAMONDS || this.suit === Suit.HEARTS)
      return Color.RED;
    return Color.BLACK;
  }

  get content(): string {
    if (this.rank === 0) return PictureCard[PictureCard.Joker];
    const suit = SuitSymbol[this.suit!];
    const rank = this.rank in PictureCard ? PictureCard[this.rank] : this.rank;
    return `${suit}${rank}`;
  }

  get accessLevel(): AccessLevel {
    return this._accessLevel;
  }

  set accessLevel(accessLevel: AccessLevel) {
    this._accessLevel = accessLevel;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
}
