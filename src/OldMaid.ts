import { Card } from "./Card";
import { Game } from "./Game";

export class OldMaid extends Game {
  init() {
    super.init();
    this.removePairs();
  }

  removePairs() {
    const currentPlayer = this.getCurrentPlayer();
    const cards = currentPlayer.cards.map((card) => new Card(card));

    console.log(cards);
    // TODO: implement the logic to remove pairs
  }

  start() {
    console.log("OldMaid game started");
  }
  end() {
    console.log("OldMaid game ended");
  }
}
