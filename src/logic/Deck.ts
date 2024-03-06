import { CardDealer } from "./CardDealer";

export class Deck extends CardDealer {
  private cardCount: number;

  constructor(jokerCount: number = 2) {
    super();
    this.cardCount = 52 + jokerCount;
    this.init();
  }

  private init() {
    this.cards = [...Array(this.cardCount).keys()];
  }

  add(card: number): number {
    if (card >= this.cardCount) {
      throw new Error("This card should not exit in the game");
    }
    return super.add(card);
  }
}
