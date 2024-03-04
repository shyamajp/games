import { Card } from "./Card";
import { Deck } from "./Deck";
import { OldMaid } from "./OldMaid";
import { Player, PlayerStatus } from "./Player";

const deck = new Deck(1);

const game = new OldMaid(deck, [
  new Player("Alice"),
  new Player("Bob"),
  new Player("Charlie"),
]);

function handleClick(button: HTMLButtonElement, board: HTMLDivElement) {
  const setCounter = () => {
    button.innerHTML = `turn: ${game.turn} by ${game.getCurrentPlayer().name}`;
    board.innerHTML = game.players
      .map(
        (player) =>
          `<div>${player.name} (${PlayerStatus[player.status]}) - ${player.cards
            .map((c) => new Card(c).display())
            .join(" | ")}</div>`
      )
      .join("");
    game.nextTurn();
  };
  button.addEventListener("load", () => setCounter());
  button.addEventListener("click", () => setCounter());
  setCounter();
}

export { game, handleClick };
