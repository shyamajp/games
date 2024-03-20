import { Card } from "./Card";
import { Game, GameStatus } from "./Game";
import { PlayerStatus } from "./Player";

export class OldMaid extends Game {
  protected init() {
    this.distribute();
    for (let i = 0; i < this.players.length; i++) {
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
  }

  protected cleanup() {}

  protected routine(): void {
    this.transferCard();
    this.judge();
    this.removePairs();
    this.judge();
  }

  public play(): void {
    if (this.status === GameStatus.PLAYING) {
      while (this.getCurrentPlayer().status !== PlayerStatus.PLAYING) {
        this.next();
      }
      this.routine();
    }
  }

  private judgePlayers(): void {
    const players = this.getPlayers();
    players.forEach((player) => {
      if (player.cards.length === 0) player.status = PlayerStatus.WON;
    });
  }

  private judgeGame(): void {
    const players = this.getPlayers();
    if (players.length === 1) {
      players[0].status = PlayerStatus.LOST;
      this.end();
    }
  }

  protected judge(): void {
    this.judgePlayers();
    this.judgeGame();
  }

  // TODO: refactor this method
  private removePairs(): void {
    const currentPlayer = this.getCurrentPlayer();
    // TODO: fix dependency on Card
    const cards = currentPlayer.cards.map((card) => new Card(card));
    const skipIndeces: number[] = [];
    const skipCards: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (!skipIndeces.includes(i) && cards[i].num === cards[j].num) {
          skipIndeces.push(i, j);
          skipCards.push(cards[i].raw, cards[j].raw);
        }
      }
    }

    skipCards.forEach((card) => this.deck.add(currentPlayer.remove(card)));
  }

  private transferCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer()!;
    const card: number = currentPlayer.input || nextPlayer.getRandomCard();
    currentPlayer.add(nextPlayer.remove(card));
  }
}
