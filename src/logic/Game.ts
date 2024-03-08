import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";
import { reorderArray } from "./utils";

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

  constructor(deck: Deck, players: Player[]) {
    this.deck = deck;
    this.players = players;
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
    this.turn++;
  }

  abstract judgePlayer(player: Player): void;

  abstract judgeGame(): void;

  protected distribute(): void {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
    this.turn = 0;
  }

  getStatus(pretty: false): GameStatus;
  getStatus(pretty: true): PrettyStatus;
  getStatus(pretty: boolean = false) {
    if (pretty) return GameStatus[this.status];
    return this.status;
  }

  getPlayers(status: PlayerStatus = PlayerStatus.IS_PLAYING): Player[] {
    const players = this.players.filter((player) => player.status === status);
    const index = players.findIndex(
      (p) => p.id === this.players[this.turn % this.players.length].id
    );
    return reorderArray(players, index);
  }

  getCurrentPlayer(): Player {
    let player = this.players[this.turn % this.players.length];
    if (player.status !== PlayerStatus.IS_PLAYING) {
      this.turn++;
      return this.getNextPlayer();
    }
    return player;
  }

  getNextPlayer(): Player {
    for (let i = 1; i < this.players.length; i++) {
      const player = this.players[(this.turn + i) % this.players.length];
      if (player.status === PlayerStatus.IS_PLAYING) return player;
    }
    return this.players[(this.turn + 1) % this.players.length];
  }
}
