import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";

export enum GameStatus {
  IS_PLAYING,
  IS_OVER,
}

export abstract class Game {
  protected playerCount: number;
  deck: Deck;
  players: Player[];
  turn: number;
  status: GameStatus;

  constructor(deck: Deck, players: Player[]) {
    this.deck = deck;
    this.players = players;
    this.playerCount = this.getPlayerCount();
    this.turn = 0;
    this.status = GameStatus.IS_PLAYING;
    this.init();
  }

  init(): void {}

  start(): void {
    this.status = GameStatus.IS_PLAYING;
  }

  end(): void {
    this.status = GameStatus.IS_OVER;
  }

  abstract routine(): void;

  next(): void {
    if (this.status === GameStatus.IS_PLAYING) {
      this.turn++;
    }
  }

  abstract judgePlayer(player: Player): void;

  abstract judgeGame(): void;

  protected distribute(): void {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
  }

  getPlayerCount(status?: PlayerStatus): number {
    if (status === undefined) return this.players.length;
    return this.players.filter((player) => player.status === status).length;
  }

  getCurrentPlayer(): Player {
    return this.players[this.turn % this.playerCount];
  }

  getNextPlayer(checkStatus = true): Player {
    if (checkStatus) {
      for (let i = 1; i < this.playerCount; i++) {
        const player = this.players[(this.turn + i) % this.playerCount];
        if (player.status === PlayerStatus.IS_PLAYING) {
          return player;
        }
      }
    }
    return this.players[(this.turn + 1) % this.playerCount];
  }
}
