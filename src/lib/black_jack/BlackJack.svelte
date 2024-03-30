<script lang="ts">
  import Card from "../common/Card.svelte";
  import { BlackJack } from "../../logic/black_jack/BlackJack";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";

  let game = new BlackJack([new Player("Alice"), new Player("Bob")]);

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

  function handleChallenge() {
    game.challenge();
    game = game;
  }

  function handleNext() {
    game.next();
    game = game;
  }
</script>

<section id="black-jack">
  <h1>BlackJack</h1>

  <button
    disabled={game.status !== GameStatus.PLAYING}
    type="button"
    on:click={handlePlay}
  >
    Hit
  </button>

  <button
    disabled={game.status !== GameStatus.PLAYING}
    type="button"
    on:click={handleNext}
  >
    Stand
  </button>

  <button
    disabled={game.status !== GameStatus.PLAYING}
    type="button"
    on:click={handleChallenge}
  >
    Challenge
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
    {#each player.data.hand.cards as card (card.raw)}
      <Card name={player.name} {card} />
    {/each}
  {/each}

  <h3>Deck</h3>
  {#each game.playground.data.starter.cards as card (card.raw)}
    <Card name="deck" {card} />
  {/each}
</section>
