<script lang="ts">
  import { logs } from "../../store";
  let history: string[];
  logs.subscribe((value) => {
    history = value;
  });
</script>

<div id="history">
  <h2>History</h2>
  <ul>
    {#each history.slice(-5).reverse() as log}
      <li>{log}</li>
    {/each}
  </ul>
</div>

<style>
  #history {
    background-color: lightgray;
  }
</style>
