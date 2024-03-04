import { Card } from "./Card";
import { Game } from "./Game";
import { Player, PlayerStatus } from "./Player";

export class OldMaid extends Game {
  init() {
    this.deck.shuffle();
    this.distribute();
    for (let i = 0; i < this.playerCount; i++) {
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
  }

  routine(): void {
    if (this.getCurrentPlayer().status === PlayerStatus.IS_PLAYING) {
      this.transferCard();
      this.judgePlayer(this.getNextPlayer());
      this.removePairs();
      this.judgePlayer();
    }
  }

  next(): void {
    this.routine();
    this.judgeGame();

    super.next();
  }

  judgePlayer(player: Player = this.getCurrentPlayer()) {
    if (player.cards.length === 0) {
      player.status = PlayerStatus.HAS_WON;
      console.log(`${player.name} won the game!`);
    }
  }

  judgeGame(): void {
    if (this.getPlayerCount() === 1) {
      this.end();
    }
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

  transferCard() {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer();
    const card = nextPlayer.getRandomCard();
    currentPlayer.add(nextPlayer.remove(card));
  }
}
