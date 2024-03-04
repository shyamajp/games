import { getRandomElement } from "./utils";

export abstract class CardDealer {
  cards: number[];

  constructor() {
    this.cards = [];
  }

  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  sort(): void {
    this.cards.sort((a, b) => a - b);
  }

  getRandomCard(): number {
    return getRandomElement(this.cards);
  }

  add(card: number): number {
    if (this.cards.includes(card)) {
      throw new Error(`This card is already in the ${this.constructor.name}`);
    }
    if (card < 0) {
      throw new Error("This card should not exit in the game");
    }
    this.cards.push(card);
    return card;
  }

  remove(card?: number): number {
    if (this.cards.length === 0) {
      throw new Error(`No cards left in the ${this.constructor.name}`);
    }

    if (card !== undefined) {
      const index = this.cards.indexOf(card);
      if (index < -1) {
        throw new Error(`This card is not in the ${this.constructor.name}`);
      }
      this.cards.splice(index, 1);
      return card;
    }

    return this.cards.pop()!;
  }

  turn(): void {}
}
