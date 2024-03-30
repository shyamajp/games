<script lang="ts">
  import Card from "../common/Card.svelte";
  import { Speed } from "../../logic/speed/Speed";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";

  let game = new Speed([new Player("Alice"), new Player("Bob")]);

  function handleStatus() {
    if (game.status === GameStatus.UNSTARTED) {
      game.start();
      setTimeout(() => {
        game.play();
      }, 1000);
    } else if (game.status === GameStatus.PLAYING) {
      game.pause();
    } else if (game.status === GameStatus.PAUSED) {
      game.resume();
    } else if (game.status === GameStatus.OVER) {
      game.restart();
    }
    game = game;
  }
</script>

<section id="speed">
  <h1>Speed</h1>

  <button type="button" on:click={handleStatus}>
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
    <li>gameFields players: {game.players.map((p) => p.name).join(" | ")}</li>
  </ul>
  <hr />

  <h3>Players</h3>
  {#each game.players as player (player.id)}
    <div>
      {player.name}: ({PlayerStatus[player.status]})
    </div>
    <h4>Hand</h4>
    {#each player.data.hand.cards as card (card.raw)}
      <Card name={player.name} {card} />
    {/each}
    <h4>Stock</h4>
    {#each player.data.stock.cards as card (card.raw)}
      <Card name={player.name} {card} />
    {/each}
  {/each}

  <h3>Playground</h3>
  <h4>Starter</h4>
  {#each game.playground.data.starter.cards as card (card.raw)}
    <Card name="starter" {card} />
  {/each}

  {#each game.players as player (player.id)}
    <h4>Field ({player.name})</h4>
    <div></div>
    {#each game.playground.data[player.id].cards as card (card.raw)}
      <Card name={player.name} {card} />
    {/each}
  {/each}
</section>
