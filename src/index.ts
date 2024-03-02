import { Card } from "./Card";
import { OldMaid } from "./OldMaid";

const game = new OldMaid(4);

const player1 = game.hands[0].cards;

console.log(player1.map((hand) => new Card(hand).display()));

export const res = game;
