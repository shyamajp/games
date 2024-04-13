<script lang="ts">
  import Card from "../common/Card.svelte";
  import { BlackJack } from "../../logic/black_jack/BlackJack";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";
  import GameStatusButton from "../common/GameStatusButton.svelte";

  let game = new BlackJack([new Player("Alice"), new Player("Bob")]);

  function handlePlay() {
    game.play();
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
  <GameStatusButton bind:game />
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
        ▶️<strong>{player.name}</strong>:
      {:else}
        {player.name}:
      {/if}
      {#if player.name !== "Dealer"}
        ({PlayerStatus[player.status]})
      {/if}
    </div>
    {#each player.data.hand.cards as card (card.raw)}
      <Card name={player.name} {card} />
    {/each}
    {game.calculateScore(player.data.hand.cards)}
  {/each}

  <h3>Deck</h3>
  <h4>Starter</h4>
  {#each game.playground.data.starter.cards as card (card.raw)}
    <Card name="deck" {card} />
  {/each}
</section>
