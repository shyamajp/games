import { Card } from "./Card";
import { CardDealer } from "./CardDealer";
import { Deck } from "./Deck";
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
  deck: Deck;
  players: Player[];
  turn: number;
  status: GameStatus;

  constructor(deck: Deck, players: Player[]) {
    this.deck = deck;
    this.players = players;
    this.turn = 0;
    this.status = GameStatus.UNSTARTED;
  }

  public start(): void {
    this.status = GameStatus.INITIALIZING;
    this.init();
    this.players.forEach((player) => player.init());
    this.status = GameStatus.PLAYING;
  }

  public play(): void {
    if (this.status === GameStatus.PLAYING) {
      this.routine();
    }
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
    this.cleanup();
    this.start();
    this.status = GameStatus.PLAYING;
  }

  protected abstract init(): void;
  protected abstract cleanup(): void;

  protected abstract routine(): void;
  protected abstract judge(): void;

  protected distribute(cardCount?: number): void {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      if (cardCount !== undefined && currentPlayer.cards.length === cardCount)
        break;
      this.transfer(this.deck, currentPlayer);
      this.turn++;
    }
    this.turn = 0;
  }

  protected transfer(from: CardDealer, to: CardDealer, card?: Card): void {
    to.add(from.remove(card));
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

  public getNextPlayer(): Player | undefined {
    const players = this.getPlayers();
    if (players.length === 1) return undefined;
    const currentPlayer = this.getCurrentPlayer();
    const index = players.findIndex((p) => p.id === currentPlayer.id);
    return players[(index + 1) % players.length];
  }
}
