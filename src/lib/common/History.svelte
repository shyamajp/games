<script lang="ts">
  import { Level } from "../../logic/common/Logger";
  import { logs } from "../../store";
  let history: string[];
  logs.subscribe((value) => {
    history = value;
  });

  const levels = Object.keys(Level);
  let filteredLevels = Object.keys(Level).filter((level) => level !== "DEBUG");
  $: filteredLogs = history.filter((log) =>
    filteredLevels.some((level) => log.includes(level)),
  );
  function updateFilters() {
    filteredLevels = [
      ...document.querySelectorAll('input[name="levels[]"]:checked'),
    ].map((checkbox) => checkbox.id);
  }
</script>

<div id="history">
  <h2>History</h2>
  {#each levels as level}
    <input
      type="checkbox"
      id={level}
      name="levels[]"
      checked={filteredLevels.includes(level)}
      on:change={updateFilters}
    />
    <label for={level}>{level}</label>
  {/each}
  <ul id="logs">
    {#each filteredLogs as log (log)}
      <li id="log">{log}</li>
    {/each}
  </ul>
</div>

<style>
  #history {
    color: white;
    background-color: black;
    min-height: 100%;
  }

  #logs {
    overflow: auto;
    font-family: "Courier New", Courier, monospace;
    line-break: loose;
  }
</style>
