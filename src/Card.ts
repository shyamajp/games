import { SUITES_SYMBOLS } from "./constants";

export class Card {
  card: number;

  constructor(c: number) {
    this.card = c;
  }

  display() {
    if (this.card > 51) {
      return "Joker";
    }
    const s = Math.floor(this.card / 13);
    let n: number | string = (this.card % 13) + 1;
    if (n === 1) {
      n = "A";
    } else if (n === 11) {
      n = "J";
    } else if (n === 12) {
      n = "Q";
    } else if (n === 13) {
      n = "K";
    }
    return `${SUITES_SYMBOLS[s]}${n}`;
  }
}
