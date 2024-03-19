<script lang="ts">
  import { Card } from "../logic/Card";
  export let raw: number;
  export let hidden: boolean;
  export let name: string;
  export let disabled: boolean;

  const card = new Card(raw);
  const content = card.display();
  const color = card.getColor();

  function handleCheck() {}
</script>

<label class="card">
  <input {name} type="radio" {disabled} value={raw} on:click={handleCheck} />
  <span class="content {color}">
    {!hidden ? content : ""}
  </span>
</label>
