<script lang="ts">
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
    } else {
      Game = null;
    }
  }

  let history: string[];
  logs.subscribe((value) => {
    history = value;
  });
</script>

<div>
  <header>
    Header
    <label for="games">Start</label>
    <select name="games" id="games" on:change={handleGame}>
      <option selected value="">Choose a game</option>
      {#each games as game (game.id)}
        <option value={game.id}>{game.name}</option>
      {/each}
    </select>
  </header>
  <aside>
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
</div>

<style>
</style>
