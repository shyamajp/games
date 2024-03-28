import { Card } from "./Card";
import { CardDealer } from "./CardDealer";
import { IllegalCardError } from "./Error";

export class Deck extends CardDealer {
  private cardCount: number;

  constructor(cardCount: number) {
    super();
    this.cardCount = cardCount;
    this.cards = Array.from(Array(this.cardCount).keys()).map(
      (i) => new Card(i),
    );
  }

  init(): void {
    this.shuffle();
  }

  add(card: Card): Card {
    if (card.raw >= this.cardCount) {
      throw new IllegalCardError();
    }
    return super.add(card);
  }
}
