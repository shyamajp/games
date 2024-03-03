import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";

export enum GameStatus {
  isPlaying,
  isOver,
}

export class Game {
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
    this.status = GameStatus.isPlaying;
    this.init();
  }

  private init() {
    this.deck.shuffle();
    this.distribute();
    this.turn = 0;
  }

  private distribute() {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
  }

  getPlayerCount() {
    return this.players.filter(
      (player) => player.status === PlayerStatus.isPlaying
    ).length;
  }

  getCurrentPlayer() {
    return this.players[this.turn % this.playerCount];
  }

  getNextPlayer(checkStatus = true) {
    if (checkStatus) {
      for (let i = 1; i < this.playerCount; i++) {
        const player = this.players[(this.turn + i) % this.playerCount];
        if (player.status === PlayerStatus.isPlaying) {
          return player;
        }
      }
    }
    return this.players[(this.turn + 1) % this.playerCount];
  }

  start() {
    console.log("game started");
  }

  end() {
    this.status = GameStatus.isOver;
    console.log("game ended");
  }

  nextTurn() {
    if (this.status === GameStatus.isPlaying) {
      this.turn++;
    }
  }
}
