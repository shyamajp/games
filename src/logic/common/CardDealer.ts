import { v4 as uuidv4 } from "uuid";
import { getRandomElement } from "./utils";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  IllegalCardError,
  NoCardsLeftError,
} from "./Error";
import { Card } from "./Card";

export abstract class CardDealer {
  cards: Card[];
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
    this.cards.sort((a, b) => a.raw - b.raw);
  }

  add(card: Card): Card {
    if (this.cards.includes(card)) throw new CardAlreadyExistsError();
    if (card.raw < 0) throw new IllegalCardError();
    this.cards.push(card);
    return card;
  }

  remove(card?: Card): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    if (card !== undefined) {
      const index = this.getCardIndex(card);
      this.cards.splice(index, 1);
      return card;
    }
    return this.getLastCard();
  }

  protected getCardIndex(card: Card): number {
    const index = this.cards.map((card) => card.raw).indexOf(card.raw);
    console.log(card, index);
    if (index < 0) throw new CardDoesNotExistError();
    return index;
  }

  getRandomCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return getRandomElement(this.cards);
  }

  protected getLastCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return this.cards.pop()!;
  }
}
