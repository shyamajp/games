<script lang="ts">
  import { Card } from "../../logic/common/Card";
  export let raw: number;
  export let name: string;
  export let hidden: boolean = false;
  export let disabled: boolean = false;
  export let handleInput: (value: any) => void = () => {};

  const card = new Card(raw);
  const content = card.display();
</script>

<label class="card">
  <input {name} {disabled} type="radio" value={raw} on:click={handleInput} />
  <span class="content {card.color}">
    {!hidden ? content : ""}
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
