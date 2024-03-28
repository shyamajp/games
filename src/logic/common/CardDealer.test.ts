import { describe, suite, test, expect } from "vitest";
import { CardDealer } from "./CardDealer";
import { AccessLevel, Card } from "./Card";
import {
  CardAlreadyExistsError,
  CardDoesNotExistError,
  NoCardsLeftError,
} from "./Error";

class MockCardDealer extends CardDealer {
  protected init(): void {}

  shuffle() {
    super.shuffle();
  }

  getCardIndex(card: Card): number {
    return super.getCardIndex(card);
  }
}

describe("CardDealer", () => {
  const card = new Card(0);

  suite("With no cards", () => {
    const cardDealer = new MockCardDealer();
    test("constructor", () => {
      expect(cardDealer.id.length).toBe(36);
      expect(cardDealer.cards.length).toBe(0);
    });

    test("shuffle", () => {
      expect(() => cardDealer.shuffle()).not.toThrowError();
    });

    test("sort", () => {
      expect(() => cardDealer.sort()).not.toThrowError();
    });

    test("remove", () => {
      expect(() => cardDealer.remove(card)).toThrow(NoCardsLeftError);
    });

    test("getCardIndex", () => {
      expect(() => cardDealer.getCardIndex(card)).toThrow(NoCardsLeftError);
    });

    test("getRandomCard", () => {
      expect(() => cardDealer.getRandomCard()).toThrow(NoCardsLeftError);
    });

    test("getLastCard", () => {
      expect(() => cardDealer.getLastCard()).toThrow(NoCardsLeftError);
    });
  });

  suite("With multiple cards", () => {
    const cardDealer = new MockCardDealer();
    const cardCount = 54;
    cardDealer.cards = Array.from(Array(cardCount).keys()).map(
      (i) => new Card(i),
    );
    expect(cardDealer.cards.length).toBe(cardCount);

    test("getRandomCard", { retry: 3 }, () => {
      const random1 = cardDealer.getRandomCard();
      const random2 = cardDealer.getRandomCard();
      expect(random1.raw).not.toBe(random2.raw);
    });

    test("getCardIndex/shuffle/sort", { retry: 3 }, () => {
      expect(cardDealer.getCardIndex(card)).toBe(0);
      cardDealer.shuffle();
      expect(cardDealer.getCardIndex(card)).not.toBe(0);
      cardDealer.sort();
      expect(cardDealer.getCardIndex(card)).toBe(0);
    });

    test("setDisabled", () => {
      expect(cardDealer.cards.filter((card) => card.disabled).length).toBe(
        cardCount,
      );
      cardDealer.setDisabled(false);
      expect(cardDealer.cards.filter((card) => !card.disabled).length).toBe(
        cardCount,
      );
    });

    test("setAccessLevel", () => {
      expect(
        cardDealer.cards.filter((card) => card.accessLevel === AccessLevel.NONE)
          .length,
      ).toBe(cardCount);
      cardDealer.setAccessLevel(AccessLevel.ALL);
      expect(
        cardDealer.cards.filter((card) => card.accessLevel === AccessLevel.ALL)
          .length,
      ).toBe(cardCount);
    });

    test("remove", () => {
      expect(() => cardDealer.remove(new Card(cardCount))).toThrow(
        CardDoesNotExistError,
      );
    });

    test("add", () => {
      expect(() => cardDealer.add(card)).toThrow(CardAlreadyExistsError);
    });

    test("add/remove", () => {
      expect(() => cardDealer.remove(new Card(0))).not.toThrowError();
      expect(cardDealer.cards.length).toBe(cardCount - 1);
      expect(() => cardDealer.add(new Card(cardCount))).not.toThrowError();
      expect(cardDealer.cards.length).toBe(cardCount);
      expect(() => cardDealer.remove()).not.toThrowError();
      expect(cardDealer.cards.length).toBe(cardCount - 1);
    });
  });
});
