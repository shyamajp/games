import { Card } from "./Card";
import { Deck } from "./Deck";
import { Game, GameStatus } from "./Game";
import { Player, PlayerStatus } from "./Player";

export class OldMaid extends Game {
  input: number | undefined;

  constructor(deck: Deck, players: Player[]) {
    super(deck, players);
    this.input = undefined;
  }

  protected init() {
    this.distribute();
    for (let i = 0; i < this.players.length; i++) {
      const currentPlayer = this.players[i];
      this.removePairs(currentPlayer);
      this.turn++;
    }
    this.turn = 0;
  }

  protected routine(): void {
    const currentPlayer = this.getCurrentPlayer();
    this.transferCard();
    this.judge();
    this.removePairs(currentPlayer);
    this.judge();
  }

  public next(): void {
    if (this.getCurrentPlayer().status !== PlayerStatus.IS_PLAYING) return;
    this.routine();
    if (this.status === GameStatus.OVER) return;
    super.next();
  }

  public setInput(raw: number | undefined): void {
    this.input = raw;
  }

  private judgePlayers(): void {
    const players = this.getPlayers();
    players.forEach((player) => {
      if (player.cards.length === 0) player.status = PlayerStatus.HAS_WON;
    });
  }

  private judgeGame(): void {
    const players = this.getPlayers();
    if (players.length === 1) {
      players[0].status = PlayerStatus.HAS_LOST;
      this.end();
    }
  }

  protected judge(): void {
    this.judgePlayers();
    this.judgeGame();
  }

  private removePairs(player: Player): void {
    const cards = player.cards.map((card) => new Card(card));

    const skipIndeces: number[] = [];
    const skipCards: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (
          !skipIndeces.includes(i) &&
          !skipIndeces.includes(j) &&
          cards[i].num === cards[j].num
        ) {
          skipIndeces.push(i, j);
          skipCards.push(cards[i].raw, cards[j].raw);
        }
      }
    }
    skipCards.forEach((c) => player.remove(c));
  }

  private transferCard(
    picker: Player = this.getCurrentPlayer(),
    holder: Player = this.getNextPlayer()!
  ): void {
    const card = this.input || holder.getRandomCard();
    picker.add(holder.remove(card));
  }
}
