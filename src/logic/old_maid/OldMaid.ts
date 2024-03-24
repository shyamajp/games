import { AccessLevel, Card } from "../common/Card";
import { Game } from "../common/Game";
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
  }

  setInput(raw: number | undefined): void {
    const card = this.getNextPlayer()?.cards.find((card) => card.raw === raw);
    this.input = raw === undefined ? undefined : card;
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
    this.setDisabled();
  }

  public start(): void {
    super.start();
  }

  public next(): void {
    // skip players who have won
    do {
      super.next();
    } while (this.getCurrentPlayer().status === PlayerStatus.WON);
    this.setDisabled();
  }

  private setDisabled() {
    this.getCurrentPlayer().setDisabled(true);
    this.getNextPlayer()?.setDisabled(false);
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

  // REFACTOR: update logic
  private removePairs(): void {
    const currentPlayer = this.getCurrentPlayer();
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

    skipCards.forEach((card) => {
      this.transfer(currentPlayer, this.deck, card);
      card.accessLevel = AccessLevel.ALL;
      card.disabled = true;
    });
  }

  private transferCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer()!;
    const card: Card = this.input || nextPlayer.getRandomCard();
    this.transfer(nextPlayer, currentPlayer, card);
  }
}
