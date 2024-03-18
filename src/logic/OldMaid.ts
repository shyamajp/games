import { Game, GameStatus } from "./Game";
import { PlayerStatus } from "./Player";

export class OldMaid extends Game {
  protected init() {
    this.distribute();
    for (let i = 0; i < this.players.length; i++) {
      const currentPlayer = this.players[i];
      currentPlayer.removePairs().forEach((c) => this.deck.add(c));
      this.turn++;
    }
    this.turn = 0;
  }

  protected cleanup() {}

  protected routine(): void {
    const currentPlayer = this.getCurrentPlayer();
    this.transferCard();
    this.judge();
    currentPlayer.removePairs().forEach((c) => this.deck.add(c));
    this.judge();
  }

  public play(): void {
    if (this.status === GameStatus.PLAYING) {
      while (this.getCurrentPlayer().status !== PlayerStatus.PLAYING) {
        this.turn++;
      }
      this.routine();
      this.turn++;
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

  private transferCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer()!;
    const card: number = currentPlayer.input || nextPlayer.getRandomCard();
    currentPlayer.add(nextPlayer.remove(card));
  }
}
