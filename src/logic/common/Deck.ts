import { v4 as uuidv4 } from "uuid";
import { getRandomElement } from "./utils";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  IllegalCardError,
  NoCardsLeftError,
} from "./Error";
import { AccessLevel, Card, CARDS } from "./Card";

/**
 * Represents a deck of cards.
 * @property {string} id The unique identifier of the deck.
 * @property {number} count The max number of cards in the deck.
 * @property {Card[]} cards The array of cards in the deck.
 */
export class Deck {
  readonly id: string = uuidv4();
  readonly count;
  cards: Card[] = [];

  /**
   * Creates a new deck with the specified number of cards.
   * @param count The max number of cards in the deck.
   */
  constructor(count: number = 52) {
    this.count = count;
  }

  /**
   * Shuffles the cards in the deck.
   */
  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  /**
   * Sorts the cards in the deck in ascending order.
   */
  sort(): void {
    this.cards.sort((a, b) => a.raw - b.raw);
  }

  /**
   * Generates the cards for the deck.
   */
  generate(): void {
    for (let i = 0; i < this.count; i++) {
      this.add(CARDS[i]);
    }
  }

  /**
   * Clears the deck of all cards.
   */
  clear(): void {
    this.cards = [];
  }

  /**
   * Adds a card to the deck.
   * @param card The card to add.
   * @returns The added card.
   * @throws {CardAlreadyExistsError} If the card already exists in the deck.
   * @throws {IllegalCardError} If the card is not within the range of the deck.
   */
  add(card: Card): Card {
    if (card.raw >= this.count) throw new IllegalCardError();
    if (this.cards.map((card) => card.raw).includes(card.raw))
      throw new CardAlreadyExistsError();
    this.cards.push(card);
    return card;
  }

  /**
   * Removes a card from the deck.
   * @param card The card to remove. If not specified, removes the last card in the deck.
   * @returns The removed card.
   * @throws {NoCardsLeftError} If there are no cards left in the deck.
   * @throws {CardDoesNotExistError} If the specified card does not exist in the deck.
   * @throws {IllegalCardError} If the card is not within the range of the deck.
   */
  remove(card?: Card): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    if (card !== undefined) {
      if (card.raw >= this.count) throw new IllegalCardError();
      const index = this.getCardIndex(card);
      this.cards.splice(index, 1);
      return card;
    }
    return this.cards.pop()!;
  }

  /**
   * Gets the index of a card in the deck.
   * @param card The card to get the index of.
   * @returns The index of the card.
   * @throws {NoCardsLeftError} If there are no cards left in the deck.
   * @throws {CardDoesNotExistError} If the specified card does not exist in the deck.
   * @throws {IllegalCardError} If the card is not within the range of the deck.
   */
  getCardIndex(card: Card): number {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    if (card.raw >= this.count) {
      console.log("illegall");
      throw new IllegalCardError();
    }
    const index = this.cards.map((card) => card.raw).indexOf(card.raw);
    if (index < 0) throw new CardDoesNotExistError();
    return index;
  }

  /**
   * Gets a random card from the deck.
   * @returns A random card.
   * @throws {NoCardsLeftError} If there are no cards left in the deck.
   */
  getRandomCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return getRandomElement(this.cards);
  }

  /**
   * Gets the last card in the deck.
   * @returns The last card.
   * @throws {NoCardsLeftError} If there are no cards left in the deck.
   */
  getLastCard(): Card {
    if (this.cards.length === 0) throw new NoCardsLeftError();
    return this.cards[this.cards.length - 1];
  }

  /**
   * Sets the disabled state of a card in the deck.
   * @param disabled The disabled state to set.
   * @param cardIndex The index of the card to set the disabled state for. If not specified, sets the disabled state for all cards.
   */
  setDisabled(disabled: boolean, cardIndex?: number): void {
    if (cardIndex !== undefined) {
      this.cards[cardIndex].disabled = disabled;
    } else {
      this.cards.forEach((card) => (card.disabled = disabled));
    }
  }

  /**
   * Sets the access level of a card in the deck.
   * @param accessLevel The access level to set.
   * @param cardIndex The index of the card to set the access level for. If not specified, sets the access level for all cards.
   */
  setAccessLevel(accessLevel: AccessLevel, cardIndex?: number): void {
    if (cardIndex !== undefined) {
      this.cards[cardIndex].accessLevel = accessLevel;
    } else {
      this.cards.forEach((card) => (card.accessLevel = accessLevel));
    }
  }
}
