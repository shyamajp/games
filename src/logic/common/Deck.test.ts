import { describe, suite, test, expect } from "vitest";
import { Deck } from "./Deck";
import { AccessLevel, Card } from "./Card";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  NoCardsLeftError,
} from "./Error";

class MockDeck extends Deck {
  protected init(): void {}

  shuffle() {
    super.shuffle();
  }

  getCardIndex(card: Card): number {
    return super.getCardIndex(card);
  }
}

describe("Deck", () => {
  const card = new Card(0);

  suite("With no cards", () => {
    const deck = new MockDeck();
    test("constructor", () => {
      expect(deck.id.length).toBe(36);
      expect(deck.cards.length).toBe(0);
    });

    test("shuffle", () => {
      expect(() => deck.shuffle()).not.toThrowError();
    });

    test("sort", () => {
      expect(() => deck.sort()).not.toThrowError();
    });

    test("remove", () => {
      expect(() => deck.remove(card)).toThrow(NoCardsLeftError);
    });

    test("getCardIndex", () => {
      expect(() => deck.getCardIndex(card)).toThrow(NoCardsLeftError);
    });

    test("getRandomCard", () => {
      expect(() => deck.getRandomCard()).toThrow(NoCardsLeftError);
    });

    test("getLastCard", () => {
      expect(() => deck.getLastCard()).toThrow(NoCardsLeftError);
    });
  });

  suite("With multiple cards", () => {
    const deck = new MockDeck();
    const cardCount = 54;
    deck.cards = Array.from(Array(cardCount).keys()).map((i) => new Card(i));
    expect(deck.cards.length).toBe(cardCount);

    test("getRandomCard", { retry: 3 }, () => {
      const random1 = deck.getRandomCard();
      const random2 = deck.getRandomCard();
      expect(random1.raw).not.toBe(random2.raw);
    });

    test("getCardIndex/shuffle/sort", { retry: 3 }, () => {
      expect(deck.getCardIndex(card)).toBe(0);
      deck.shuffle();
      expect(deck.getCardIndex(card)).not.toBe(0);
      deck.sort();
      expect(deck.getCardIndex(card)).toBe(0);
    });

    test("setDisabled", () => {
      expect(deck.cards.filter((card) => card.disabled).length).toBe(cardCount);
      deck.setDisabled(false);
      expect(deck.cards.filter((card) => !card.disabled).length).toBe(
        cardCount,
      );
    });

    test("setAccessLevel", () => {
      expect(
        deck.cards.filter((card) => card.accessLevel === AccessLevel.NONE)
          .length,
      ).toBe(cardCount);
      deck.setAccessLevel(AccessLevel.ALL);
      expect(
        deck.cards.filter((card) => card.accessLevel === AccessLevel.ALL)
          .length,
      ).toBe(cardCount);
    });

    test("remove", () => {
      expect(() => deck.remove(new Card(cardCount))).toThrow(
        CardDoesNotExistError,
      );
    });

    test("add", () => {
      expect(() => deck.add(card)).toThrow(CardAlreadyExistsError);
    });

    test("add/remove", () => {
      expect(() => deck.remove(new Card(0))).not.toThrowError();
      expect(deck.cards.length).toBe(cardCount - 1);
      expect(() => deck.add(new Card(cardCount))).not.toThrowError();
      expect(deck.cards.length).toBe(cardCount);
      expect(() => deck.remove()).not.toThrowError();
      expect(deck.cards.length).toBe(cardCount - 1);
    });
  });
});
