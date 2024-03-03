import { Card } from "./Card";
import { Game } from "./Game";
import { getRandomElement } from "./utils";

export class OldMaid extends Game {
  init() {
    super.init();
    console.log("Removing all pairs");
    for (let i = 0; i < this.playerCount; i++) {
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
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

  pickCard() {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer();

    const card = getRandomElement(nextPlayer.cards);
    currentPlayer.add(nextPlayer.remove(card));
  }

  start() {
    console.log("OldMaid game started");
  }

  end() {
    console.log("OldMaid game ended");
  }

  nextTurn(): void {
    super.nextTurn();
    this.pickCard();
    this.removePairs();
  }
}
