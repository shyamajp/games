<script lang="ts">
  import { Card } from "../logic/Card";
  import { Deck } from "../logic/Deck";
  import { OldMaid } from "../logic/OldMaid";
  import { Player, PlayerStatus } from "../logic/Player";

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
    <li>
      {player.name}: ({PlayerStatus[player.status]}) - {player.cards
        .map((c) => new Card(c).display())
        .join(" | ")}
    </li>
  {/each}
</ul>
