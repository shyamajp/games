import { AccessLevel, Card } from "./Card";
import { Deck } from "./Deck";
import { Playground } from "./Playground";
import { Player, PlayerStatus } from "./Player";

export enum GameStatus {
  UNSTARTED,
  INITIALIZING,
  PLAYING,
  OVER,
  PAUSED,
}
type PrettyStatus = keyof typeof GameStatus;

export abstract class Game {
  abstract playground: Playground;
  players: Player[];
  turn: number = 0;
  status: GameStatus = GameStatus.UNSTARTED;

  constructor(players: Player[]) {
    this.players = players;
  }

  public start(): void {
    this.init();
    this.status = GameStatus.PLAYING;
  }

  public play(): void {
    this.routine();
  }

  public next(): void {
    this.turn++;
  }

  public end(): void {
    this.cleanup();
    this.status = GameStatus.OVER;
  }

  public pause(): void {
    this.status = GameStatus.PAUSED;
  }

  public resume(): void {
    this.status = GameStatus.PLAYING;
  }

  public restart(): void {
    this.end();
    this.start();
  }

  protected init(): void {
    this.status = GameStatus.INITIALIZING;
    this.playground.init();
    this.players.forEach((player) => player.init());
  }
  protected abstract cleanup(): void;

  protected abstract routine(): void;
  protected abstract judge(): void;

  // TODO(REFACTOR): update logic
  protected distribute(cardCount?: number): void {
    while (this.playground.data.starter.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      if (
        cardCount !== undefined &&
        currentPlayer.data.hand!.cards.length === cardCount
      )
        break;
      this.transfer(
        this.playground.data.starter,
        currentPlayer.data.hand!,
      ).accessLevel = AccessLevel.SELF;
      this.turn++;
    }
    this.turn = 0;
  }

  protected transfer(from: Deck, to: Deck, card?: Card): Card {
    return to.add(from.remove(card));
  }

  public getStatus(pretty: false): GameStatus;
  public getStatus(pretty: true): PrettyStatus;
  public getStatus(pretty: boolean = false) {
    if (pretty) return GameStatus[this.status];
    return this.status;
  }

  public getPlayers(status: PlayerStatus = PlayerStatus.PLAYING): Player[] {
    const players = this.players.filter((player) => player.status === status);
    return players;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.turn % this.players.length];
  }

  public getNextPlayer(player = this.getCurrentPlayer()): Player | undefined {
    const players = this.getPlayers();
    if (players.length === 1) return undefined;
    const index = players.findIndex((p) => p.id === player.id);
    return players[(index + 1) % players.length];
  }
}
