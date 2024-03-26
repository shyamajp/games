<script lang="ts">
  import classnames from "classnames";
  import { AccessLevel, Card } from "../../logic/common/Card";
  export let card: Card;
  export let name: string;
  export let mine: boolean = false;
  export let disabled: boolean = card.disabled;
  export let handleInput: (value: any) => void = () => {};

  $: hidden =
    card.accessLevel === AccessLevel.NONE ||
    (card.accessLevel === AccessLevel.SELF && !mine);
</script>

<label class={classnames("card", { hidden })}>
  <input
    {name}
    {disabled}
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

  .hidden {
    background-color: gray;
  }
</style>
