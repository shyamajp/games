export class Hand {
  cards: number[];

  constructor() {
    this.cards = [];
  }

  drawCard(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in your hand");
    }
    return this.cards.pop();
  }

  throwCard(card: number) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      throw new Error("This card is not in your hand");
    }
    this.cards.splice(index, 1);
    return this.cards;
  }
}
