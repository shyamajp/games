export class Deck {
  private cardCount: number;
  cards: number[];

  constructor(jokerCount: number = 2) {
    this.cards = [];
    this.cardCount = 52 + jokerCount;
    this.init();
  }

  private init() {
    this.cards = [...Array(this.cardCount).keys()];
  }

  shuffle() {
    return this.cards.sort(() => Math.random() - 0.5);
  }

  add(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in the deck");
    }
    if (card < 0 || card > this.cardCount) {
      throw new Error("This card should not be in the deck");
    }
    this.cards.push(card);
    return card;
  }

  remove() {
    if (this.cards.length === 0) {
      throw new Error("No cards left in the deck");
    }
    return this.cards.pop()!;
  }
}
