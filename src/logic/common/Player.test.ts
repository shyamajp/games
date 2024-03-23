import { describe, test, expect } from "vitest";
import { Player, PlayerStatus } from "./Player";

describe("Player", () => {
  const player = new Player("Alice");

  test("constructor", () => {
    expect(player.name).toBe("Alice");
    expect(player.cards.length).toBe(0);
    expect(player.status).toEqual(PlayerStatus.UNSTARTED);
  });

  test("init", () => {
    player.init();
    expect(player.status).toEqual(PlayerStatus.PLAYING);
  });
});
