export class Hand {
  cards: number[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  drawCard(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in your hand");
    }
    return this.cards.push(card);
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
