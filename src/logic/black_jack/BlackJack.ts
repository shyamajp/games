import { Card } from "../common/Card";
import { Playground } from "../common/Playground";
import { Game, GameStatus } from "../common/Game";
import { Player, PlayerStatus } from "../common/Player";

export class BlackJack extends Game {
  dealer: Player = new Player("Dealer");
  playground: Playground = new Playground(52);

  constructor(players: Player[]) {
    super(players);
    // TODO: dealer should not be in players
    this.players.push(this.dealer);
  }

  protected init() {
    super.init();
    this.distribute(2);
    for (let i = 0; i < this.players.length; i++) {
      this.judgePlayer(this.players[i]);
      this.turn++;
    }
    this.turn = 0;
  }

  protected routine(): void {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.status === PlayerStatus.PLAYING) {
      this.transfer(this.playground.data.starter, currentPlayer.data.hand);
      this.judgePlayer(currentPlayer);
    }
  }

  public challenge(): void {
    while (this.calculateScore(this.dealer.data.hand.cards) < 17) {
      this.transfer(this.playground.data.starter, this.dealer.data.hand);
    }
    this.judge();
  }

  private calculateScore(hands: Card[]) {
    const cards = hands;
    return cards.reduce((acc, card) => {
      const score = Math.min(card.rank, 10);
      return acc + score;
    }, 0);
  }

  private judgePlayer(player: Player): void {
    const sum = this.calculateScore(player.data.hand.cards);
    if (sum > 21) {
      player.status = PlayerStatus.LOST;
    } else if (sum === 21) {
      player.status = PlayerStatus.WON;
    }
  }

  protected judge(): void {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const playerScore = this.calculateScore(player.data.hand.cards);
      const dealerScore = this.calculateScore(
        this.playground.data.starter.cards,
      );

      if (playerScore > 21) {
        player.status = PlayerStatus.LOST;
      } else if (dealerScore > 21) {
        player.status = PlayerStatus.WON;
      } else if (playerScore > dealerScore) {
        player.status = PlayerStatus.WON;
      } else if (playerScore < dealerScore) {
        player.status = PlayerStatus.LOST;
      } else {
        player.status = PlayerStatus.DRAW;
      }
    }

    this.status = GameStatus.OVER;
  }
}
