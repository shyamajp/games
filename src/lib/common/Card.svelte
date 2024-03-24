<script lang="ts">
  import { AccessLevel, Card } from "../../logic/common/Card";
  export let card: Card;
  export let name: string;
  export let handleInput: (value: any) => void = () => {};
</script>

<label class="card">
  <input
    {name}
    disabled={card.disabled}
    type="radio"
    value={card.raw}
    on:click={handleInput}
  />
  <span class="content {card.color} {AccessLevel[card.accessLevel]}">
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

  .NONE {
    background-color: blue;
  }
  .SELF {
    background-color: yellow;
  }
</style>
