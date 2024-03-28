import { describe, suite, test, expect } from "vitest";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { IllegalCardError } from "./Error";

describe("Deck", () => {
  suite("54 cards", () => {
    const CARD_COUNT = 54;
    const deck = new Deck(CARD_COUNT);

    test("constructor", () => {
      expect(deck.cards.length).toBe(CARD_COUNT);
    });

    test("remove/add", () => {
      const card = deck.remove();
      expect(deck.cards.length).toBe(CARD_COUNT - 1);
      deck.add(card);
      expect(deck.cards.length).toBe(CARD_COUNT);
    });

    test("add", () => {
      const card = new Card(CARD_COUNT);
      expect(() => deck.add(card)).toThrow(IllegalCardError);
    });
  });

  suite("0 cards", () => {
    const CARD_COUNT = 0;
    const deck = new Deck(CARD_COUNT);

    test("init", () => {
      expect(deck.cards.length).toBe(CARD_COUNT);
    });
  });
});
