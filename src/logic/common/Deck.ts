import { v4 as uuidv4 } from "uuid";
import { getRandomElement } from "./utils";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  NoCardsLeftError,
} from "./Error";
import { AccessLevel, Card } from "./Card";

export abstract class Deck {
  cards: Card[] = [];
  id: string = uuidv4();

  protected abstract init(): void;

  protected shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  sort(): void {
    this.cards.sort((a, b) => a.raw - b.raw);
  }

  add(card: Card): Card {
    if (this.cards.map((card) => card.raw).includes(card.raw))
      throw new CardAlreadyExistsError();
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
    return this.cards.pop()!;
  }

  protected getCardIndex(card: Card): number {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    const index = this.cards.map((card) => card.raw).indexOf(card.raw);
    if (index < 0) throw new CardDoesNotExistError();
    return index;
  }

  getRandomCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return getRandomElement(this.cards);
  }

  getLastCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return this.cards[this.cards.length - 1];
  }

  setDisabled(disabled: boolean, cardIndex?: number): void {
    if (cardIndex !== undefined) {
      this.cards[cardIndex].disabled = disabled;
    } else {
      this.cards.forEach((card) => (card.disabled = disabled));
    }
  }

  setAccessLevel(accessLevel: AccessLevel, cardIndex?: number): void {
    if (cardIndex !== undefined) {
      this.cards[cardIndex].accessLevel = accessLevel;
    } else {
      this.cards.forEach((card) => (card.accessLevel = accessLevel));
    }
  }
}
