import { Card } from "./Card";
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
    this.cards = Array.from(Array(this.cardCount).keys()).map(
      (i) => new Card(i),
    );
    this.shuffle();
  }

  add(card: Card): Card {
    if (card.raw >= this.cardCount) {
      throw new IllegalCardError();
    }
    return super.add(card);
  }
}
