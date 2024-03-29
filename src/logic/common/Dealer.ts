import { Card } from "./Card";
import { Deck } from "./Deck";
import { IllegalCardError } from "./Error";

export class Dealer extends Deck {
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
