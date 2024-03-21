<script lang="ts">
  import { games } from "./constants";

  let Game: any;

  function handleGame(e: any) {
    const game = games.find((game) => game.id === e.target.value);
    if (game) {
      import(`./lib/${game.id}/${game.componentName}.svelte`).then((module) => {
        Game = module.default;
      });
    }
  }
</script>

<main>
  <header>
    {#each games as game (game.id)}
      <input
        id={game.id}
        name="game"
        type="radio"
        value={game.id}
        on:change={handleGame}
      />
      <label for={game.id}>{game.name}</label><br />
    {/each}
  </header>
  <svelte:component this={Game} />
</main>

<style>
</style>
