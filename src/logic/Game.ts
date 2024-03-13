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

  protected abstract routine(): void;

  protected next(): void {
    this.turn++;
  }

  protected abstract judge(): void;

  protected distribute(): void {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
    this.turn = 0;
  }

  public getStatus(pretty: false): GameStatus;
  public getStatus(pretty: true): PrettyStatus;
  public getStatus(pretty: boolean = false) {
    if (pretty) return GameStatus[this.status];
    return this.status;
  }

  public getPlayers(status: PlayerStatus = PlayerStatus.IS_PLAYING): Player[] {
    const players = this.players.filter((player) => player.status === status);
    return players;
  }

  public getCurrentPlayer(): Player {
    let player;
    for (let i = 0; i < this.players.length; i++) {
      player = this.players[(this.turn + i) % this.players.length];
      if (player.status !== PlayerStatus.HAS_WON) {
        return player;
      }
    }
    throw new Error("No player is playing");
  }

  public getNextPlayer(): Player | undefined {
    const players = this.getPlayers();
    if (players.length === 1) return undefined;
    const currentPlayer = this.getCurrentPlayer();
    const index = players.findIndex((p) => p.id === currentPlayer.id);
    return players[(index + 1) % players.length];
  }
}
