import { AccessLevel, Card } from "../common/Card";
import { Playground } from "../common/Playground";
import { Game } from "../common/Game";
import { Player, PlayerStatus } from "../common/Player";
import { Deck } from "../common/Deck";

export class OldMaid extends Game {
  input: Card | undefined;
  playground = new Playground(53);

  constructor(players: Player[]) {
    super(players);
    this.playground.data = {
      ...this.playground.data,
      waste: new Deck(53),
    };
  }

  protected init() {
    super.init();
    this.playground.data.waste.clear();

    this.distribute();
    for (let i = 0; i < this.players.length; i++) {
      this.removePairs();
      this.turn++;
    }
    this.turn = 0;
  }

  setInput(raw: number | undefined): void {
    const card = this.getNextPlayer()?.data.hand?.cards.find(
      (card) => card.raw === raw,
    );
    this.input = raw === undefined ? undefined : card;
  }

  protected routine(): void {
    this.drawCard();
    this.setInput(undefined);
    this.judgePlayer(this.getNextPlayer()!);
    this.judge();
    this.removePairs();
    this.judgePlayer(this.getCurrentPlayer());
    this.judge();
    this.setDisabled();
  }

  public start(): void {
    super.start();
    this.setDisabled();
  }

  public next(): void {
    // skip players who have won
    do {
      super.next();
    } while (this.getCurrentPlayer().status === PlayerStatus.WON);
    this.setDisabled();
  }

  private setDisabled() {
    this.getCurrentPlayer().data.hand?.setDisabled(true);
    this.getNextPlayer()?.data.hand?.setDisabled(false);
  }

  private judgePlayer(player: Player): void {
    if (player.data.hand?.cards.length === 0) player.status = PlayerStatus.WON;
  }

  protected judge(): void {
    const players = this.getPlayers();
    if (players.length === 1) {
      players[0].status = PlayerStatus.LOST;
      this.end();
    }
  }

  private removePairs(): void {
    const currentPlayer = this.getCurrentPlayer();
    const cards: Card[] = currentPlayer.data.hand!.cards;

    let removables: Card[] = [];
    const flag: { [key: number]: number } = {};

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const rank = card.rank;
      if (flag[rank] >= 0) {
        removables.push(cards[flag[rank]], card);
        flag[rank] = -1;
      } else {
        flag[rank] = i;
      }
    }

    // TODO: Allow multiple cards to be transfered
    removables.forEach((card) => {
      this.transfer(currentPlayer.data.hand, this.playground.data.waste, card);
      card.accessLevel = AccessLevel.ALL;
      card.disabled = true;
    });
  }

  private drawCard(): void {
    const currentPlayer = this.getCurrentPlayer();
    const nextPlayer = this.getNextPlayer()!;
    const card: Card = this.input || nextPlayer.data.hand.getRandomCard();
    this.transfer(nextPlayer.data.hand, currentPlayer.data.hand, card);
  }
}
