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

  public next(): void {
    super.next();
    if (this.turn === this.players.length - 1) {
      this.challenge();
    }
  }

  private challenge(): void {
    // If all players have busted, skip dealer's turn
    let challengeable = false;
    for (let i = 0; i < this.players.length - 1; i++) {
      if (this.players[i].status === PlayerStatus.PLAYING) {
        challengeable = true;
        break;
      }
    }

    // Draw until dealer's score is no less than 17
    if (challengeable) {
      this.dealer.data.hand.cards[1].accessLevel = AccessLevel.ALL;
      while (this.calculateScore(this.dealer.data.hand.cards) < 17) {
        this.transfer(
          this.playground.data.starter,
          this.dealer.data.hand,
        ).accessLevel = AccessLevel.ALL;
      }
    }

    // Judge the game
    this.judge();
  }

  public calculateScore(cards: Card[]) {
    let total = cards.reduce((acc, card) => {
      const score = Math.min(card.rank, 10);
      return acc + score;
    }, 0);
    const aces = cards.filter((card) => card.rank === 1).length;
    // Ace counts as 11 when total is no more than 21
    for (let i = 0; i < aces; i++) {
      if (total + 10 <= 21) {
        total += 10;
      }
    }
    return total;
  }

  private judgePlayer(player: Player): void {
    const sum = this.calculateScore(player.data.hand.cards);
    if (sum > 21) {
      player.status = PlayerStatus.LOST;
      this.next();
    } else if (sum === 21) {
      this.next();
    }
  }

  protected judge(): void {
    const dealerScore = this.calculateScore(this.dealer.data.hand.cards);
    for (let i = 0; i < this.players.length - 1; i++) {
      const player = this.players[i];
      // Skip players who has already lost
      if (player.status === PlayerStatus.LOST) continue;

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
