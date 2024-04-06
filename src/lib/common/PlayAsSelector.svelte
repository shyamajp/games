<script lang="ts">
  import { Player } from "../../logic/common/Player";

  // TODO(feature): allow play as no one / everyone
  // deal with hidden/disabled properties? or is it too much?
  export let players: Player[];
  export let playAs: Player = players[0];

  function handlePlayAs(e: any) {
    playAs = players.find((p) => p.id === e.target.value)!;
  }
</script>

<div id="play-as-selector">
  playing as:
  <select name="play-as" id="play-as" on:change={handlePlayAs}>
    {#each players as player (player.id)}
      <option value={player.id}>{player.name}</option>
    {/each}
  </select>
</div>
