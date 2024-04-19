import { describe, suite, test, expect } from "vitest";
import { Deck } from "./Deck";
import { AccessLevel, CARDS } from "./Card";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  NoCardsLeftError,
} from "./Error";

// TODO: decouple tests from Card class
describe("Deck", () => {
  const CARD = CARDS[0];
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
      expect(() => deck.remove(CARD)).toThrow(NoCardsLeftError);
    });

    test("getCardIndex", () => {
      expect(() => deck.getCardIndex(CARD)).toThrow(NoCardsLeftError);
    });

    test("getRandomCard", () => {
      expect(() => deck.getRandomCard()).toThrow(NoCardsLeftError);
    });

    test("getLastCard", () => {
      expect(() => deck.getLastCard()).toThrow(NoCardsLeftError);
    });
  });

  suite("With multiple cards", () => {
    const CARD_COUNT = 54;
    const deck = new Deck(CARD_COUNT);

    test("generate", () => {
      deck.generate();
      expect(deck.cards.length).toBe(CARD_COUNT);
    });

    test("getRandomCard", { retry: 3 }, () => {
      const random1 = deck.getRandomCard();
      const random2 = deck.getRandomCard();
      expect(random1.raw).not.toBe(random2.raw);
    });

    test("getLastCard", { retry: 3 }, () => {
      const lastCard = deck.getLastCard();
      expect(lastCard.raw).toBe(CARD_COUNT - 1);
    });

    test("getCardIndex/shuffle/sort", { retry: 3 }, () => {
      expect(deck.getCardIndex(CARD)).toBe(0);
      deck.shuffle();
      expect(deck.getCardIndex(CARD)).not.toBe(0);
      deck.sort();
      expect(deck.getCardIndex(CARD)).toBe(0);
    });

    test("setDisabled", () => {
      expect(deck.cards.filter((card) => card.disabled).length).toBe(
        CARD_COUNT,
      );
      deck.setDisabled(false);
      expect(deck.cards.filter((card) => !card.disabled).length).toBe(
        CARD_COUNT,
      );

      deck.setDisabled(true, 0);
      expect(deck.cards[0].disabled).toBe(true);
    });

    test("setAccessLevel", () => {
      expect(
        deck.cards.filter((card) => card.accessLevel === AccessLevel.NONE)
          .length,
      ).toBe(CARD_COUNT);
      deck.setAccessLevel(AccessLevel.ALL);
      expect(
        deck.cards.filter((card) => card.accessLevel === AccessLevel.ALL)
          .length,
      ).toBe(CARD_COUNT);

      deck.setAccessLevel(AccessLevel.SELF, 0);
      expect(deck.cards[0].accessLevel).toBe(AccessLevel.SELF);
    });

    test("add", () => {
      expect(() => deck.add(CARD)).toThrow(CardAlreadyExistsError);
    });

    test("remove/add", () => {
      expect(() => deck.remove(CARD)).not.toThrowError();
      expect(() => deck.remove(CARD)).toThrow(CardDoesNotExistError);
      expect(deck.cards.length).toBe(CARD_COUNT - 1);
      expect(() => deck.add(CARD)).not.toThrowError();
      expect(deck.cards.length).toBe(CARD_COUNT);
      expect(() => deck.remove()).not.toThrowError();
      expect(deck.cards.length).toBe(CARD_COUNT - 1);
    });
  });
});
