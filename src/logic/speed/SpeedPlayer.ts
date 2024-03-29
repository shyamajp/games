import { Deck } from "../common/Deck";
import { Player } from "../common/Player";

export class SpeedPlayer extends Player {
  stock: Deck = new Deck(52);
}
