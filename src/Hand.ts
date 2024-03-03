export class Hand {
  cards: number[];
  readonly name: string;

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  sort() {
    this.cards.sort((a, b) => a - b);
  }

  add(card: number) {
    if (this.cards.includes(card)) {
      throw new Error("This card is already in your hand");
    }

    this.cards.push(card);
    this.sort();
    return card;
  }

  remove(card: number) {
    const index = this.cards.indexOf(card);
    if (index < -1) {
      throw new Error("This card is not in your hand");
    }
    this.cards.splice(index, 1);
    this.sort();
    return card;
  }
}
