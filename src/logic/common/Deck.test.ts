import { describe, suite, test, expect } from "vitest";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { IllegalCardError } from "./Error";

describe("Deck", () => {
  suite("54 cards", () => {
    const deck = new Deck();

    test("constructor", () => {
      expect(deck.cards.length).toBe(54);
    });

    test("remove/add", () => {
      deck.add(deck.remove());
      expect(deck.cards.length).toBe(54);
    });

    test("add", () => {
      const card = new Card(54);
      expect(() => deck.add(card)).toThrow(IllegalCardError);
    });
  });

  suite("0 cards", () => {
    const deck = new Deck(0);

    test("init", () => {
      expect(deck.cards.length).toBe(0);
    });
  });
});
