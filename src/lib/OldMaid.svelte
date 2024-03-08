<script lang="ts">
  import Cards from "./Cards.svelte";
  import { Deck } from "../logic/Deck";
  import { OldMaid } from "../logic/OldMaid";
  import { Player, PlayerStatus } from "../logic/Player";

  let picked: number | undefined;

  const deck = new Deck(1);
  let game = new OldMaid(deck, [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
  ]);

  function handleStart() {
    game.start();
    game = game;
  }

  function handleNext() {
    game.setInput(picked);
    game.next();
    game = game;
    picked = undefined;
  }
</script>

<button on:click={handleNext}>
  turn: {game.turn}
</button>

<button on:click={handleStart}>Start</button>

<ul>
  <li>game: {game.getStatus(true)}</li>
  <li>
    players: {game
      .getPlayers()
      .map((p) => p.name)
      .join(" | ")}
  </li>
</ul>
<hr />
<ul>
  {#each game.players as player (player.name)}
    <li>
      {#if player.id === game.getCurrentPlayer().id}
        ▶️<strong>{player.name}</strong>: ({PlayerStatus[player.status]})
      {:else}
        {player.name}: ({PlayerStatus[player.status]})
      {/if}
      <Cards
        cards={player.cards}
        name={player.name}
        pickable={player.name === game.getNextPlayer().name}
        bind:picked
      />
    </li>
  {/each}
</ul>
