import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";

export enum GameStatus {
  PLAYING,
  OVER,
  INITIALIZING,
}
type PrettyStatus = keyof typeof GameStatus;

export abstract class Game {
  deck: Deck;
  players: Player[];
  turn: number;
  status: GameStatus;
  protected playerCount: number;

  constructor(deck: Deck, players: Player[]) {
    this.deck = deck;
    this.players = players;
    this.playerCount = this.getPlayerCountByStatus();
    this.turn = 0;
    this.status = GameStatus.INITIALIZING;
    this.init();
  }

  protected abstract init(): void;

  start(): void {
    this.status = GameStatus.PLAYING;
  }

  protected end(): void {
    this.status = GameStatus.OVER;
  }

  abstract routine(): void;

  protected next(): void {
    if (this.status === GameStatus.PLAYING) {
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

  getStatus(pretty: false): GameStatus;
  getStatus(pretty: true): PrettyStatus;
  getStatus(pretty: boolean = false) {
    if (pretty) return GameStatus[this.status];
    return this.status;
  }

  getPlayerCountByStatus(
    status: PlayerStatus = PlayerStatus.IS_PLAYING
  ): number {
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
