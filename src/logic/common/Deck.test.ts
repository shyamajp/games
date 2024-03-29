import { describe, suite, test, expect } from "vitest";
import { Deck } from "./Deck";
import { AccessLevel, Card } from "./Card";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  IllegalCardError,
  NoCardsLeftError,
} from "./Error";

describe("Deck", () => {
  const card = new Card(0);

  suite("With no cards", () => {
    const deck = new Deck(0);
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
    const cardCount = 54;
    const deck = new Deck(cardCount);
    const firstCard = new Card(0);
    const illegalCard = new Card(cardCount);

    test("generate", () => {
      deck.generate();
      expect(deck.cards.length).toBe(cardCount);
    });

    test("getRandomCard", { retry: 3 }, () => {
      const random1 = deck.getRandomCard();
      const random2 = deck.getRandomCard();
      expect(random1.raw).not.toBe(random2.raw);
    });

    test("getLastCard", { retry: 3 }, () => {
      const card = deck.getLastCard();
      expect(card.raw).toBe(cardCount - 1);
    });

    test("getCardIndex", () => {
      expect(() => deck.getCardIndex(illegalCard)).toThrow(IllegalCardError);
    });

    test("getCardIndex/shuffle/sort", { retry: 3 }, () => {
      expect(deck.getCardIndex(firstCard)).toBe(0);
      deck.shuffle();
      expect(deck.getCardIndex(firstCard)).not.toBe(0);
      deck.sort();
      expect(deck.getCardIndex(firstCard)).toBe(0);
    });

    test("setDisabled", () => {
      expect(deck.cards.filter((card) => card.disabled).length).toBe(cardCount);
      deck.setDisabled(false);
      expect(deck.cards.filter((card) => !card.disabled).length).toBe(
        cardCount,
      );

      deck.setDisabled(true, 0);
      expect(deck.cards[0].disabled).toBe(true);
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

      deck.setAccessLevel(AccessLevel.SELF, 0);
      expect(deck.cards[0].accessLevel).toBe(AccessLevel.SELF);
    });

    test("remove", () => {
      expect(() => deck.remove(illegalCard)).toThrow(IllegalCardError);
    });

    test("add", () => {
      expect(() => deck.add(illegalCard)).toThrow(IllegalCardError);
      expect(() => deck.add(card)).toThrow(CardAlreadyExistsError);
    });

    test("remove/add", () => {
      expect(() => deck.remove(firstCard)).not.toThrowError();
      expect(() => deck.remove(firstCard)).toThrow(CardDoesNotExistError);
      expect(deck.cards.length).toBe(cardCount - 1);
      expect(() => deck.add(firstCard)).not.toThrowError();
      expect(deck.cards.length).toBe(cardCount);
      expect(() => deck.remove()).not.toThrowError();
      expect(deck.cards.length).toBe(cardCount - 1);
    });
  });
});
