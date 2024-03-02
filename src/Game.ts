import { Deck } from "./Deck";
import { Hand } from "./Hand";

export class Game {
  players: number;
  deck: Deck;
  hands: Hand[];
  turn: number;
  constructor(players: number) {
    this.players = players;
    this.deck = new Deck();
    this.hands = [...Array(players).keys()].map((i) => new Hand("Player " + i));
    this.turn = 0;
    this.init();
  }

  init() {
    this.deck.shuffle();
    while (this.deck.cards.length > 0) {
      const currentPlayer = this.getCurrentPlayer();
      currentPlayer.add(this.deck.remove());
      this.turn++;
    }
  }

  getCurrentPlayer() {
    return this.hands[this.turn % this.players];
  }

  start() {
    console.log("game started");
  }

  end() {
    console.log("game ended");
  }
}
