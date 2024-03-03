import { Card } from "./Card";
import { Game } from "./Game";
import { PlayerStatus } from "./Player";
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
          skipCards.push(cards[i].raw, cards[j].raw);
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

  judge() {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.cards.length === 0) {
      currentPlayer.status = PlayerStatus.hasWon;
      console.log(`${currentPlayer.name} won the game!`);
    }
  }

  start() {
    console.log("OldMaid game started");
  }

  end() {
    super.end();
    console.log("OldMaid game ended");
  }

  nextTurn(): void {
    this.judge();
    if (this.getCurrentPlayer().status === PlayerStatus.isPlaying) {
      this.pickCard();
      this.removePairs();
      this.judge();
    }

    if (this.getPlayerCount() === 1) {
      this.end();
    }
    super.nextTurn();
  }
}
