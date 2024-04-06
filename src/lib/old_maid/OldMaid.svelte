<script lang="ts">
  import Card from "../common/Card.svelte";
  import { OldMaid } from "../../logic/old_maid/OldMaid";
  import { Player, PlayerStatus } from "../../logic/common/Player";
  import { GameStatus } from "../../logic/common/Game";
  import GameStatusButton from "../common/GameStatusButton.svelte";
  import PlayAsSelector from "../common/PlayAsSelector.svelte";

  let game = new OldMaid([
    new Player("Alice", 53),
    new Player("Bob", 53),
    new Player("Charlie", 53),
  ]);
  let playAs: Player;
  $: currentPlayer = game.getCurrentPlayer();
  $: nextPlayer = game.getNextPlayer();

  function handlePlay() {
    game.play();
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

  <button
    disabled={game.status !== GameStatus.PLAYING}
    type="button"
    on:click={handlePlay}
  >
    Play
  </button>
  <GameStatusButton bind:game />
  <ul>
    <li>game: {game.getStatus(true)}</li>
    <li>
      players: {game.players.map((p) => p.name).join(" | ")}
    </li>
    <li>
      <PlayAsSelector bind:playAs players={game.players} />
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
    {#each player.data.hand.cards as card (card.raw)}
      <!-- TODO(REFACTOR): clean the logic for disabled/hidden -->
      <Card
        name={player.name}
        {card}
        {handleInput}
        mine={player.id === playAs?.id}
        disabled={!(
          !card.disabled && game.getNextPlayer(playAs)?.id === nextPlayer?.id
        ) || playAs?.status !== PlayerStatus.PLAYING}
      />
    {/each}
  {/each}

  <h3>Plauground</h3>
  <h4>Starter</h4>
  {#each game.playground.data.starter.cards as card (card.raw)}
    <Card name="starter" {card} />
  {/each}
  <h4>Waste</h4>
  {#each game.playground.data.waste.cards as card (card.raw)}
    <Card name="waste" {card} />
  {/each}
</section>
