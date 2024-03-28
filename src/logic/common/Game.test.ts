import { describe, test, expect, suite } from "vitest";
import { Game, GameStatus } from "./Game";
import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";

class MockGame extends Game {
  deck = new Deck(54);
  protected cleanup(): void {}
  protected routine(): void {}
  protected judge(): void {}
  distribute(cardCount?: number) {
    super.distribute(cardCount);
  }
}

describe("Game", () => {
  suite("multiple players", () => {
    const players = [new Player("Alice"), new Player("Bob")];
    const game = new MockGame(players);

    test("constructor", () => {
      expect(game.players).toBe(players);
      expect(game.turn).toBe(0);
      expect(game.status).toBe(GameStatus.UNSTARTED);
    });

    test("getPlayers", () => {
      expect(game.getPlayers(PlayerStatus.UNSTARTED)).toStrictEqual(players);
    });

    test("status", () => {
      game.start();
      expect(game.getStatus(false)).toBe(GameStatus.PLAYING);
      expect(game.getStatus(true)).toBe(GameStatus[GameStatus.PLAYING]);
      game.pause();
      expect(game.getStatus(false)).toBe(GameStatus.PAUSED);
      expect(game.getStatus(true)).toBe(GameStatus[GameStatus.PAUSED]);
      game.resume();
      expect(game.getStatus(false)).toBe(GameStatus.PLAYING);
      expect(game.getStatus(true)).toBe(GameStatus[GameStatus.PLAYING]);
      game.end();
      expect(game.getStatus(false)).toBe(GameStatus.OVER);
      expect(game.getStatus(true)).toBe(GameStatus[GameStatus.OVER]);
      game.restart();
      expect(game.getStatus(false)).toBe(GameStatus.PLAYING);
      expect(game.getStatus(true)).toBe(GameStatus[GameStatus.PLAYING]);
    });

    test("distribute", () => {
      expect(game.deck.cards.length).toBe(54);
      game.distribute(2);
      expect(game.deck.cards.length).toBe(50);
      expect(game.players[0].cards.length).toBe(2);
      expect(game.players[1].cards.length).toBe(2);
      game.distribute();
      expect(game.deck.cards.length).toBe(0);
      expect(game.players[0].cards.length).toBe(27);
      expect(game.players[0].cards.length).toBe(27);
    });

    test("getCurrentPlayer/getNexPlayer", () => {
      expect(game.getCurrentPlayer()).toStrictEqual(players[0]);
      expect(game.getNextPlayer()).toStrictEqual(players[1]);
      game.next();
      expect(game.getCurrentPlayer()).toStrictEqual(players[1]);
      expect(game.getNextPlayer()).toStrictEqual(players[0]);
    });
  });

  suite("single player", () => {
    const players = [new Player("Alice")];
    const game = new MockGame(players);

    test.skip("play", () => {
      game.play();
    });

    test("getCurrentPlayer/getNexPlayer", () => {
      game.start();
      expect(game.getCurrentPlayer()).toStrictEqual(players[0]);
      expect(game.getNextPlayer()).toStrictEqual(undefined);
      game.next();
      expect(game.getCurrentPlayer()).toStrictEqual(players[0]);
      expect(game.getNextPlayer()).toStrictEqual(undefined);
    });
  });
});
