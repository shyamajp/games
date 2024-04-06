<script lang="ts">
  import GameSelector from "./lib/common/GameSelector.svelte";
  import History from "./lib/common/History.svelte";
  let Game: ConstructorOfATypedSvelteComponent | null = null;
</script>

<div id="app">
  <header id="header">
    <GameSelector bind:Game />
  </header>
  <div id="main">
    <aside>
      <History />
    </aside>
    <main>
      <svelte:component this={Game} />
    </main>
  </div>
  <footer id="footer">shyamajp</footer>
</div>

<style>
  #app {
    height: 100vh;
    overflow-x: hidden;
    display: grid;
    grid-template-rows: 50px auto 50px;
  }

  #header {
    background-color: lightblue;
  }

  #main {
    height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
  }

  #footer {
    background-color: lightblue;
  }
</style>
