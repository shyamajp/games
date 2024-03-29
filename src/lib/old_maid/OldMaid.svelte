<script lang="ts">
  import Card from "../common/Card.svelte";
  import { OldMaid } from "../../logic/old_maid/OldMaid";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";

  let game = new OldMaid([
    new Player("Alice", 53),
    new Player("Bob", 53),
    new Player("Charlie", 53),
  ]);
  let playAs: Player = game.players[0];
  $: currentPlayer = game.getCurrentPlayer();
  $: nextPlayer = game.getNextPlayer();

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
    game.next();
    game = game;
  }

  function handleInput(e: any) {
    game.setInput(+e.target.value);
    game = game;
  }

  function handlePlayAs(e: any) {
    playAs = game.players.find((p) => p.id === e.target.value)!;
  }
</script>

<section id="old-maid">
  <h1>Old Maid</h1>

  <button
    disabled={game.status !== GameStatus.PLAYING}
    type="button"
    on:click={handlePlay}
  >
    Play
  </button>

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
    <li>
      players: {game.players.map((p) => p.name).join(" | ")}
    </li>
    <li>
      playing as:
      <select name="playing-as" id="playing-as" on:change={handlePlayAs}>
        {#each game.players as player (player.id)}
          <option value={player.id}>{player.name}</option>
        {/each}
      </select>
    </li>
  </ul>
  <hr />

  <h3>Players</h3>

  {#each game.players as player (player.id)}
    <div>
      {#if player.id === currentPlayer.id}
        ▶️<strong>{player.name}</strong>: ({PlayerStatus[player.status]})
      {:else}
        {player.name}: ({PlayerStatus[player.status]})
      {/if}
    </div>
    {#each player.hand.cards as card (card.raw)}
      <!-- TODO(REFACTOR): clean the logic for disabled/hidden -->
      <Card
        name={player.name}
        {card}
        {handleInput}
        mine={player.id === playAs?.id}
        disabled={!(
          !card.disabled && game.getNextPlayer(playAs)?.id === nextPlayer?.id
        ) || playAs.status !== PlayerStatus.PLAYING}
      />
    {/each}
  {/each}

  <h3>Deck</h3>
  {#each game.playground.starter.cards as card (card.raw)}
    <Card name="deck" {card} />
  {/each}
</section>
