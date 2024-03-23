import { Card } from "../common/Card";
import { Game, GameStatus } from "../common/Game";
import { PlayerStatus } from "../common/Player";

export class OldMaid extends Game {
  input: Card | undefined;

  protected init() {
    this.distribute();
    for (let i = 0; i < this.players.length; i++) {
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
    this.input = undefined;
  }

  setInput(raw: number | undefined): void {
    this.input = raw === undefined ? raw : new Card(raw);
  }

  protected cleanup() {
    this.setInput(undefined);
  }

  protected routine(): void {
    this.transferCard();
    this.cleanup();
    this.judge();
    this.removePairs();
    this.judge();
  }

  public next(): void {
    // skip players who have won
    do {
      super.next();
    } while (this.getCurrentPlayer().status === PlayerStatus.WON);
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
    const cards: Card[] = currentPlayer.cards;
    const skipIndeces: number[] = [];
    const skipCards: Card[] = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (!skipIndeces.includes(i) && cards[i].rank === cards[j].rank) {
          skipIndeces.push(i, j);
          skipCards.push(cards[i], cards[j]);
        }
      }
    }

    skipCards.forEach((card) => this.transfer(currentPlayer, this.deck, card));
  }

  private transferCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer()!;
    const card: Card = this.input || nextPlayer.getRandomCard();
    this.transfer(nextPlayer, currentPlayer, card);
  }
}
