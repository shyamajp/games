import { AccessLevel, Card } from "../common/Card";
import { Deck } from "../common/Deck";
import { Game, GameStatus } from "../common/Game";
import { Player, PlayerStatus } from "../common/Player";
import { Playground } from "../common/Playground";

const OPEN_CARDS = 5;

export class Speed extends Game {
  playground: Playground;
  players: Player[];
  constructor(players: Player[]) {
    super(players);
    this.playground = new Playground(52);
    this.players = players;
    this.players.forEach((player) => {
      player.data = {
        ...player.data,
        stock: new Deck(52),
      };
      this.playground.data = {
        ...this.playground.data,
        [player.id]: new Deck(52),
      };
    });
  }

  protected init() {
    super.init();
    // Distrubute all cards to players' stock
    this.distribute(
      undefined,
      this.players.map((player) => player.data.stock),
    );

    // Prepare 5 cards to players' hand
    this.players.forEach((player) => {
      this.prepareHand(player);
    });

    // Put one card to field after 1 second
    this.prepareField();

    // TODO: allow game without turn
    // this.turn = -1;
  }

  private prepareField(): void {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      this.transfer(player.data.stock, this.playground.data[player.id]);
    }
  }

  private prepareHand(player: Player): void {
    while (
      player.data.hand.cards.length < OPEN_CARDS &&
      player.data.stock.cards.length > 0
    ) {
      const card = player.data.stock.getLastCard();
      card.accessLevel = AccessLevel.ALL;
      card.disabled = false;
      this.transfer(player.data.stock, player.data.hand, card);
    }
  }

  private addCardToField(player: Player, field: string, card?: Card): void {
    this.transfer(player.data.stock, this.playground.data[field], card);
  }

  protected routine(): void {
    this.judge();
  }

  protected judge(): void {
    const players = this.getPlayers();
    players.forEach((player) => {
      if (player.data.hand.cards.length === 0) {
        player.status = PlayerStatus.WON;
        if (players.length === 2) {
          this.status = GameStatus.OVER;
        }
      }
    });
  }
}
