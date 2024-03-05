<script lang="ts">
  import { Card } from "../logic/Card";

  export let raw: number;
  const card = new Card(raw);
  const content = card.display();
  const color = card.getColor();
</script>

<div class="card" style="color:{color}">
  {content}
</div>

<style>
  .card {
    display: inline-block;
    width: 60px;
    height: 100px;
    margin-right: 10px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
    font-size: 20px;
  }
</style>
