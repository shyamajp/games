import { Card } from "./Card";
import { Deck } from "./Deck";
import { OldMaid } from "./OldMaid";

const deck = new Deck(1);
const game = new OldMaid(deck, 4);

const player1 = game.hands[0].cards;

console.log(player1.map((hand) => new Card(hand).display()));

export const res = game;
