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

    const skipIndex: number[] = [];
    const skipCards: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (
          !skipIndex.includes(i) &&
          !skipIndex.includes(j) &&
          cards[i].num === cards[j].num
        ) {
          skipIndex.push(i, j);
          skipCards.push(cards[i].card, cards[j].card);
        }
      }
    }

    skipCards.forEach((c) => currentPlayer.remove(c));
  }

  start() {
    console.log("OldMaid game started");
  }
  end() {
    console.log("OldMaid game ended");
  }
}
