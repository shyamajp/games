import { AccessLevel } from "../common/Card";
import { Deck } from "../common/Deck";
import { Game, GameStatus } from "../common/Game";
import { Player, PlayerStatus } from "../common/Player";
import { SpeedPlayer } from "./SpeedPlayer";
import { SpeedPlayground } from "./SpeedPlayground";

const OPEN_CARDS = 5;

export class Speed extends Game {
  playground: SpeedPlayground;
  players: SpeedPlayer[];
  constructor(players: SpeedPlayer[]) {
    super(players);
    this.players = players;
    this.playground = new SpeedPlayground(
      52,
      this.players.map(() => new Deck(52)),
    );
  }

  protected init() {
    super.init();
    this.distribute();
    // put the first card from each player to the field
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const card = player.hand.getLastCard();
      const field = this.playground.fields[i];
      card.accessLevel = AccessLevel.ALL;
      // TODO(FIX): swap hand and stock
      this.transfer(player.hand, field, card);

      for (let _i = 0; _i < OPEN_CARDS; _i++) {
        const card = this.players[i].hand.getLastCard();
        card.accessLevel = AccessLevel.ALL;
        card.disabled = false;
        this.transfer(player.hand, player.stock, card);
      }
    }
    // TODO: allow game without turn
    // this.turn = -1;
  }

  protected cleanup() {}

  protected routine(): void {
    this.judge();
  }

  protected judge(): void {
    const players = this.getPlayers();
    players.forEach((player) => {
      if (player.hand.cards.length === 0) {
        player.status = PlayerStatus.WON;
        if (players.length === 2) {
          this.status = GameStatus.OVER;
        }
      }
    });
  }
}
