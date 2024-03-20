<script lang="ts">
  import Card from "../common/Card.svelte";
  import { Deck } from "../../logic/common/Deck";
  import { BlackJack } from "../../logic/black_jack/BlackJack";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";

  const deck = new Deck(0);
  let game = new BlackJack(deck, [new Player("Alice"), new Player("Bob")]);

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

  <button on:click={handlePlay} disabled={game.status !== GameStatus.PLAYING}>
    Hit
  </button>

  <button on:click={handleNext} disabled={game.status !== GameStatus.PLAYING}>
    Stand
  </button>

  <button
    on:click={handleChallenge}
    disabled={game.status !== GameStatus.PLAYING}
  >
    Challenge
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
      <Card name={player.name} {raw} disabled />
    {/each}
  {/each}

  <h3>Deck</h3>
  {#each game.deck.cards as raw (raw)}
    <Card name="deck" {raw} disabled />
  {/each}
</section>
