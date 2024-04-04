<script lang="ts">
  import { Game, GameStatus } from "../../logic/common/Game";
  export let game: Game;

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
</script>

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
