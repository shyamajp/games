import { describe, test, expect, beforeEach } from "vitest";
import { Card, Color, Suit, AccessLevel } from "./Card";
import { CardAlreadyExistsError, IllegalCardError } from "./Error";

describe("Card", () => {
  beforeEach(() => {
    // Reset the limit of instance creation
    Card["_count"] = [];
  });

  test("should throw an error if raw is illegal", () => {
    expect(() => new Card(-1)).toThrow(IllegalCardError);
  });

  test("should not throw an error if raw is valid", () => {
    expect(() => new Card(0)).not.toThrowError();
  });

  test("should throw an error if multiple duplicate cards are created", () => {
    expect(() => {
      new Card(0);
      new Card(0);
    }).toThrow(CardAlreadyExistsError);
  });

  test("should throw an error if more than the allowed number of instances are created", () => {
    expect(() => {
      for (let i = 0; i < 100; i++) {
        new Card(i);
      }
    }).toThrow(IllegalCardError);
  });

  test.each([
    ["numerical", 0, Suit.CLUBS, 1, Color.BLACK, "♣A"],
    ["picture", 20, Suit.DIAMONDS, 8, Color.RED, "♦8"],
    ["Joker", 53, undefined, 0, Color.BLACK, "Joker"],
  ])(
    "should get all attributes for a %s card",
    (_case, raw, suit, rank, color, content) => {
      const card = new Card(raw);
      expect(card.raw).toEqual(raw);
      expect(card.accessLevel).toEqual(AccessLevel.NONE);
      expect(card.disabled).toEqual(true);
      expect(card.suit).toEqual(suit);
      expect(card.rank).toEqual(rank);
      expect(card.color).toEqual(color);
      expect(card.content).toEqual(content);
    },
  );

  test("should modify access level", () => {
    const card = new Card(0);
    card.accessLevel = AccessLevel.SELF;
    expect(card.accessLevel).toEqual(AccessLevel.SELF);
  });

  test("should modify disabled", () => {
    const card = new Card(0);
    card.disabled = true;
    expect(card.disabled).toEqual(true);
  });
});
