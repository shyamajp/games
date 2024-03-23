import { describe, test, expect } from "vitest";
import { Card, Color, Suit, AccessLevel } from "./Card";

describe("Card", () => {
  test("should throw an error if raw is illegal", () => {
    expect(() => new Card(-1)).toThrowError();
  });

  test("should not throw an error if raw is valid", () => {
    expect(() => new Card(0)).not.toThrowError();
    expect(new Card(0)).toBeInstanceOf(Card);
  });

  test.each([
    ["numerical", 0, AccessLevel.NONE, Suit.CLUBS, 1, Color.BLACK, "♣A"],
    ["picture", 20, AccessLevel.NONE, Suit.DIAMONDS, 8, Color.RED, "♦8"],
    ["Joker", 53, AccessLevel.NONE, undefined, 0, Color.BLACK, "Joker"],
  ])(
    "should get all attributes for a %s card",
    (_case, raw, accessLevel, suit, rank, color, content) => {
      const card = new Card(raw);

      expect(card.raw).toEqual(raw);
      expect(card.accessLevel).toEqual(accessLevel);
      expect(card.suit).toEqual(suit);
      expect(card.rank).toEqual(rank);
      expect(card.color).toEqual(color);
      expect(card.content).toEqual(content);
    },
  );
});
