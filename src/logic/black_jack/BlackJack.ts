import { Card } from "../common/Card";
import { Deck } from "../common/Deck";
import { Game, GameStatus } from "../common/Game";
import { Player, PlayerStatus } from "../common/Player";

export class BlackJack extends Game {
  dealer: Player;

  constructor(deck: Deck, players: Player[]) {
    super(deck, players);
    // TODO: dependency injection?
    this.dealer = new Player("Dealer");
    this.players.push(this.dealer);
  }

  protected init() {
    this.distribute(2);
    for (let i = 0; i < this.players.length; i++) {
      this.judgePlayer(this.players[i]);
      this.turn++;
    }
    this.turn = 0;
  }

  protected cleanup() {}

  protected routine(): void {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.status === PlayerStatus.PLAYING) {
      currentPlayer.add(this.deck.remove());
      this.judgePlayer(currentPlayer);
    }
  }

  public challenge(): void {
    while (this.calculateScore(this.dealer.cards) < 17) {
      this.dealer.add(this.deck.remove());
    }
    this.judge();
  }

  private calculateScore(hands: Card[]) {
    const cards = hands;
    return cards.reduce((acc, card) => {
      const score = Math.min(card.getNumber(false), 10);
      return acc + score;
    }, 0);
  }

  private judgePlayer(player: Player): void {
    const sum = this.calculateScore(player.cards);
    if (sum > 21) {
      player.status = PlayerStatus.LOST;
    } else if (sum === 21) {
      player.status = PlayerStatus.WON;
    }
  }

  protected judge(): void {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const playerScore = this.calculateScore(player.cards);
      const dealerScore = this.calculateScore(this.dealer.cards);

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
