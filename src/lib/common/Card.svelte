<script lang="ts">
  import { Card } from "../../logic/common/Card";
  export let card: Card;
  export let name: string;
  export let handleInput: (value: any) => void = () => {};
</script>

<label class="card">
  <input
    {name}
    disabled={false}
    type="radio"
    value={card.raw}
    on:click={handleInput}
  />
  <span class="content {card.color}">
    {card.content}
  </span>
</label>

<style>
  .red {
    color: red;
  }

  .black {
    color: black;
  }
</style>
