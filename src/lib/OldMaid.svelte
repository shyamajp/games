<script lang="ts">
  import Card from "./Card.svelte";
  import { Deck } from "../logic/Deck";
  import { OldMaid } from "../logic/OldMaid";
  import { Player, PlayerStatus } from "../logic/Player";
  import { GameStatus } from "../logic/Game";

  const deck = new Deck(1);
  let game = new OldMaid(deck, [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
    new Player("David"),
  ]);

  function handleStatus() {
    if (game.status === GameStatus.UNSTARTED) {
      game.start();
    } else if (game.status === GameStatus.PLAYING) {
      game.pause();
    } else if (game.status === GameStatus.PAUSED) {
      game.resume();
    } else if (game.status === GameStatus.OVER) {
      game.restart();
    }
    game = game;
  }

  function handlePlay() {
    game.play();
    game = game;
  }

  $: console.log(game.turn, game.getCurrentPlayer().name);
</script>

<section id="old-maid">
  <button on:click={handlePlay} disabled={game.status !== GameStatus.PLAYING}>
    turn: {game.turn}
  </button>

  <button on:click={handleStatus}>
    {#if game.status === GameStatus.UNSTARTED}
      Start
    {:else if game.status === GameStatus.PLAYING}
      Pause
    {:else if game.status === GameStatus.PAUSED}
      Resume
    {:else if game.status === GameStatus.OVER}
      Restart
    {/if}
  </button>

  <ul>
    <li>game: {game.getStatus(true)}</li>
    <li>
      players: {game.players.map((p) => p.name).join(" | ")}
    </li>
  </ul>
  <hr />

  <h3>Players</h3>

  {#each game.players as player (player.id)}
    <div>
      {#if player.id === game.getCurrentPlayer().id}
        ▶️<strong>{player.name}</strong>: ({PlayerStatus[player.status]})
      {:else}
        {player.name}: ({PlayerStatus[player.status]})
      {/if}
    </div>
    {#each player.cards as raw (raw)}
      <Card name={player.name} {raw} hidden={false} disabled={false} />
    {/each}
  {/each}

  <h3>Deck</h3>
  {#each game.deck.cards as raw (raw)}
    <Card name="deck" {raw} hidden={false} disabled />
  {/each}
</section>
