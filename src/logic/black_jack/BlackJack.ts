import { AccessLevel, Card } from "../common/Card";
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
    this.dealer.data.hand.cards[0].accessLevel = AccessLevel.ALL;

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
    this.dealer.data.hand.cards[1].accessLevel = AccessLevel.ALL;
    while (this.calculateScore(this.dealer.data.hand.cards) < 17) {
      this.transfer(
        this.playground.data.starter,
        this.dealer.data.hand,
      ).accessLevel = AccessLevel.ALL;
    }
    this.judge();
  }

  public calculateScore(hands: Card[]) {
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
    const dealerScore = this.calculateScore(this.dealer.data.hand.cards);
    for (let i = 0; i < this.players.length - 1; i++) {
      const player = this.players[i];
      // Skip players who has already won or lost
      if (player.status !== PlayerStatus.PLAYING) continue;

      // If dealer busts, all players win
      if (dealerScore > 21) {
        player.status = PlayerStatus.WON;
        // Compare player score with dealer's
      } else {
        const playerScore = this.calculateScore(player.data.hand.cards);
        if (playerScore > dealerScore) {
          player.status = PlayerStatus.WON;
        } else if (playerScore < dealerScore) {
          player.status = PlayerStatus.LOST;
        } else {
          player.status = PlayerStatus.DRAW;
        }
      }
    }

    this.status = GameStatus.OVER;
  }
}
