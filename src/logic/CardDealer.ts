import { v4 as uuidv4 } from "uuid";
import { getRandomElement } from "./utils";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  IllegalCardError,
  NoCardsLeftError,
} from "./Error";

export abstract class CardDealer {
  cards: number[];
  id: string;

  constructor() {
    this.id = uuidv4();
    this.cards = [];
    this.init();
  }

  protected abstract init(): void;

  protected shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  sort(): void {
    this.cards.sort((a, b) => a - b);
  }

  add(card: number): number {
    if (this.cards.includes(card)) throw new CardAlreadyExistsError();
    if (card < 0) throw new IllegalCardError();
    this.cards.push(card);
    return card;
  }

  remove(card?: number): number {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    if (card !== undefined) {
      const index = this.getCardIndex(card);
      return this.cards.splice(index, 1)[0];
    }
    return this.getLastCard();
  }

  protected getCardIndex(card: number): number {
    const index = this.cards.indexOf(card);
    if (index < -1) throw new CardDoesNotExistError();
    return index;
  }

  getRandomCard(): number {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return getRandomElement(this.cards);
  }

  protected getLastCard(): number {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return this.cards.pop()!;
  }

  abstract routine(): void;
}
