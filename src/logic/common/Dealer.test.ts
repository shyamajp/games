import { describe, suite, test, expect } from "vitest";
import { Dealer } from "./Dealer";
import { Card } from "./Card";
import { IllegalCardError } from "./Error";

describe("Dealer", () => {
  suite("54 cards", () => {
    const CARD_COUNT = 54;
    const dealer = new Dealer(CARD_COUNT);

    test("constructor", () => {
      expect(dealer.cards.length).toBe(CARD_COUNT);
    });

    test("remove/add", () => {
      const card = dealer.remove();
      expect(dealer.cards.length).toBe(CARD_COUNT - 1);
      dealer.add(card);
      expect(dealer.cards.length).toBe(CARD_COUNT);
    });

    test("add", () => {
      const card = new Card(CARD_COUNT);
      expect(() => dealer.add(card)).toThrow(IllegalCardError);
    });
  });

  suite("0 cards", () => {
    const CARD_COUNT = 0;
    const dealaer = new Dealer(CARD_COUNT);

    test("init", () => {
      expect(dealaer.cards.length).toBe(CARD_COUNT);
    });
  });
});
