<script lang="ts">
  import { logs } from "../../store";
  let history: string[];
  logs.subscribe((value) => {
    history = value;
  });
</script>

<h2>History</h2>
<ul>
  {#each history.slice(-5).reverse() as log}
    <li>{log}</li>
  {/each}
</ul>
