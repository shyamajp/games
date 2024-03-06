<script lang="ts">
  import Card from "./Card.svelte";
  export let cards: number[];
  export let name: string;
  export let pickable: boolean = false;
  export let picked: number | undefined;
</script>

<div>
  {#each cards as raw (raw)}
    <label>
      <input
        type="radio"
        id={raw.toString()}
        {name}
        value={raw}
        disabled={!pickable}
        bind:group={picked}
      />
      <Card {raw} />
    </label>
  {/each}
</div>
