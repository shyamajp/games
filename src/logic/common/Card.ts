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

/**
 * Represents a playing card.
 * @property {number} raw A number representing a card. 0 to 51 are normal cards, 52 or above is a joker.
 * @property {number} suit The suit of the card. If the card is a joker, returns undefined.
 * @property {number} rank The rank of the card. If the card is a joker, returns 0.
 * @property {Color} color The color of the card. If the card is a joker, returns black.
 * @property {string} content The content of the card.
 * @property {AccessLevel} accessLevel The access level of the card.
 * @property {boolean} disabled True if the card is disabled, false otherwise.
 * @throws {IllegalCardError} If the raw number is negative.
 * @example
 * const card = new Card(0);
 * console.log(card.content); // "♣A"
 * @example
 * const card = new Card(52);
 * console.log(card.content); // "Joker"
 */

export class Card {
  readonly raw: number;
  private _accessLevel: AccessLevel;
  private _disabled: boolean;

  /**
   * Constructs a new Card instance.
   * @param {number} raw A number representing a card. 0 to 51 are normal cards, 52 or above is a joker.
   * @throws {IllegalCardError} If the raw number is negative.
   */
  constructor(raw: number) {
    if (!(raw >= 0)) {
      throw new IllegalCardError();
    }
    this.raw = raw;
    this._accessLevel = AccessLevel.NONE;
    this._disabled = true;
  }

  /**
   * Returns the suit of the card. If the card is a joker, returns undefined.
   * @returns {Suit | undefined} The suit of the card.
   */
  get suit(): Suit | undefined {
    if (this.raw > 51) return undefined;
    return Math.floor(this.raw / 13);
  }

  /**
   * Returns the rank of the card.
   * @returns {number} The rank of the card. If the card is a joker, returns 0.
   */
  get rank(): number {
    if (this.raw >= PictureCard.Joker) return 0;
    return (this.raw % 13) + 1;
  }

  /**
   * Returns the color of the card.
   * @returns {Color} The color of the card. If the card is a joker, returns black".
   */
  get color(): Color {
    if (this.suit === Suit.DIAMONDS || this.suit === Suit.HEARTS)
      return Color.RED;
    return Color.BLACK;
  }

  /**
   * Returns the content of the card.
   * @returns {string} The content of the card.
   */
  get content(): string {
    if (this.rank === 0) return PictureCard[PictureCard.Joker];
    const suit = SuitSymbol[this.suit!];
    const rank = this.rank in PictureCard ? PictureCard[this.rank] : this.rank;
    return `${suit}${rank}`;
  }

  /**
   * Returns the access level of the card.
   * @returns {AccessLevel} The access level of the card.
   */
  get accessLevel(): AccessLevel {
    return this._accessLevel;
  }

  /**
   * Sets the access level of the card.
   * @param {AccessLevel} accessLevel The access level to set.
   */
  set accessLevel(accessLevel: AccessLevel) {
    this._accessLevel = accessLevel;
  }

  /**
   * Returns whether the card is disabled.
   * @returns {boolean} True if the card is disabled, false otherwise.
   */
  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Sets whether the card is disabled.
   * @param {boolean} disabled True to disable the card, false to enable it.
   */
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
}
