import { CardDealer } from "./CardDealer";
import { IllegalCardError } from "./Error";

export class Deck extends CardDealer {
  private cardCount: number;

  constructor(jokerCount: number = 2) {
    super();
    this.cardCount = 52 + jokerCount;
    this.init();
  }

  protected init(): void {
    this.cards = [...Array(this.cardCount).keys()];
    this.shuffle();
  }

  add(card: number): number {
    if (card >= this.cardCount) {
      throw new IllegalCardError();
    }
    return super.add(card);
  }
}
