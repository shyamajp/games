<script lang="ts">
  export let Game: ConstructorOfATypedSvelteComponent | null;
  import { games } from "./constants";
  import { Logger } from "../../logic/common/Logger";

  function handleGame(e: any) {
    const game = games.find((game) => game.id === e.target.value);
    if (game) {
      Logger.debug(`Selected game - ${game.name}`, "GameSelector");
      import(`../${game.id}/${game.componentName}.svelte`).then((module) => {
        Game = module.default;
      });
    } else {
      Game = null;
    }
  }
</script>

<label for="games">Start</label>
<select name="games" id="games" on:change={handleGame}>
  <option selected value="">Choose a game</option>
  {#each games as game (game.id)}
    <option value={game.id}>{game.name}</option>
  {/each}
</select>
