<script lang="ts">
  import "./app.css";
  import { games } from "./constants";
  import { Logger } from "./logic/common/Logger";
  import { logs } from "./store";

  let Game: any;

  function handleGame(e: any) {
    const game = games.find((game) => game.id === e.target.value);
    if (game) {
      Logger.debug(`Selected game: ${game.name}`);
      import(`./lib/${game.id}/${game.componentName}.svelte`).then((module) => {
        Game = module.default;
      });
    }
  }

  let history: string[];
  logs.subscribe((value) => {
    history = value;
  });
</script>

<header>Header</header>
<aside>
  <h2>Side</h2>
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
  <h2>History</h2>
  <ul>
    <!-- TODO(REFACTOR): show history -->
    {#each history.slice(-5).reverse() as log}
      <li>{log}</li>
    {/each}
  </ul>
</aside>
<main>
  <svelte:component this={Game} />
</main>
<footer>Footer</footer>

<style lang="postcss">
</style>
