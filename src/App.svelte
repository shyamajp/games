<script lang="ts">
  import GameSelector from "./lib/common/GameSelector.svelte";
  import History from "./lib/common/History.svelte";
  let Game: ConstructorOfATypedSvelteComponent | null = null;
</script>

<div>
  <header>
    Header
    <GameSelector bind:Game />
  </header>
  <aside>
    <History />
  </aside>
  <main>
    <svelte:component this={Game} />
  </main>
  <footer>Footer</footer>
</div>

<style>
</style>
