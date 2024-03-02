export class Deck {
  private jokers: number;
  private cardCount: number;
  cards: number[];

  constructor(jokers: number = 2) {
    this.jokers = jokers;
    this.cards = [];
    this.cardCount = 52 + jokers;
    this.init();
  }

  init() {
    this.cards = [...Array(this.cardCount).keys()];
  }

  shuffle() {
    return this.cards.sort(() => Math.random() - 0.5);
  }

  remove() {
    if (this.cards.length === 0) {
      throw new Error("No cards left in the deck");
    }
    return this.cards.pop()!;
  }

  add(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in the deck");
    }
    if (card < 0 || card > this.cardCount) {
      throw new Error("This card should not be in the deck");
    }
    this.cards.push(card);
  }
}
