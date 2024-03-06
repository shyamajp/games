<script lang="ts">
  import Cards from "./Cards.svelte";
  import { Deck } from "../logic/Deck";
  import { OldMaid } from "../logic/OldMaid";
  import { Player, PlayerStatus } from "../logic/Player";

  const deck = new Deck(1);
  let game = new OldMaid(deck, [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
  ]);

  let picked: number | undefined;
  function handleClick() {
    game.updateInput(picked);
    game.next();
    game = game;
    picked = undefined;
  }
</script>

<button on:click={handleClick}>
  turn: {game.turn} ({game.getCurrentPlayer().name})
</button>

<ul>
  {#each game.players as player (player.name)}
    <li>
      {player.name}: ({PlayerStatus[player.status]})
      <Cards
        cards={player.cards}
        name={player.name}
        pickable={player.name === game.getNextPlayer().name}
        bind:picked
      />
    </li>
  {/each}
</ul>
