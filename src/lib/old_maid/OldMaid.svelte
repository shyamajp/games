<script lang="ts">
  import Card from "../common/Card.svelte";
  import { Deck } from "../../logic/common/Deck";
  import { OldMaid } from "../../logic/old_maid/OldMaid";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";

  const deck = new Deck(1);
  let game = new OldMaid(deck, [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
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

  function handleNext() {
    game.next();
    game = game;
  }

  function handleInput(e: any) {
    game.setInput(+e.target.value);
    game = game;
  }
</script>

<section id="old-maid">
  <h1>Old Maid</h1>

  <button on:click={handlePlay} disabled={game.status !== GameStatus.PLAYING}>
    turn: {game.turn}
  </button>

  <button on:click={handleNext} disabled={game.status !== GameStatus.PLAYING}>
    next
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
      <Card
        name={player.name}
        {raw}
        disabled={player.id !== game.getNextPlayer()?.id}
        {handleInput}
      />
    {/each}
  {/each}

  <h3>Deck</h3>
  {#each game.deck.cards as raw (raw)}
    <Card name="deck" {raw} disabled />
  {/each}
</section>
