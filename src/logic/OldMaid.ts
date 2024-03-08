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
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
  }

  routine(): void {
    if (this.getCurrentPlayer().status !== PlayerStatus.IS_PLAYING) return;
    this.transferCard();
    this.judgePlayer(this.getNextPlayer());
    this.removePairs();
    this.judgePlayer();
    this.judgeGame();
  }

  next(): void {
    if (this.status === GameStatus.OVER) return;
    this.routine();
    super.next();
  }

  setInput(raw: number | undefined): void {
    this.input = raw;
  }

  judgePlayer(player: Player = this.getCurrentPlayer()): void {
    if (player.cards.length === 0) player.status = PlayerStatus.HAS_WON;
  }

  judgeGame(): void {
    if (this.getPlayers().length === 1) this.end();
  }

  removePairs(): void {
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

  transferCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer();
    const card = this.input || nextPlayer.getRandomCard();
    currentPlayer.add(nextPlayer.remove(card));
  }
}
