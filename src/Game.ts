import { Deck } from "./Deck";
import { Player, PlayerStatus } from "./Player";

export class Game {
  protected playerCount: number;
  deck: Deck;
  players: Player[];
  turn: number;
  constructor(deck: Deck, playerCount: number) {
    this.playerCount = playerCount;
    this.deck = deck;
    this.players = [...Array(playerCount).keys()].map(
      (i) => new Player("Player " + i)
    );
    this.turn = 0;
    this.init();
  }

  init() {
    this.deck.shuffle();
    this.distribute();
    this.turn = 0;
  }

  distribute() {
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
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
    console.log("game ended");
  }

  nextTurn() {
    this.turn++;
  }
}
