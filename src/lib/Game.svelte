<script lang="ts">
import { Card } from "../Card";
import { Deck } from "../Deck";
import { OldMaid } from "../OldMaid";
import { Player, PlayerStatus } from "../Player";

const deck = new Deck(1);

let game = new OldMaid(deck, [
  new Player("Alice"),
  new Player("Bob"),
  new Player("Charlie"),
]);

function handleClick() {
    game.next();
    game = game;
}

</script>

<button on:click={handleClick}>
  turn: {game.turn} ({game.getCurrentPlayer().name})
</button>

<ul>
    {#each game.players as player}
        <li>{player.name}: ({PlayerStatus[player.status]}) - {player.cards.map((c) => new Card(c).display()).join(' | ')}</li>
    {/each}
</ul>