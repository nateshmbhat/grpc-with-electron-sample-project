<script lang="ts">
  import { getRandom } from "./components/component";
  let stringsToPrint: string[] = [];
  let randomNumber = 0;

  const getRandomNumber = () => {
    randomNumber = getRandom();
  };
</script>

<style>
  h1 {
    color: green;
  }
  p {
    font-family: Lora, Georgia, "Times New Roman", Times, serif;
    color: blue;
  }
</style>

{#each stringsToPrint as printable}
  <h5>{printable}</h5>
{/each}

<h1>Request JSON</h1>

<h2>Hurray !!!!</h2>
<h4>Hello its me....</h4>

<button on:click|preventDefault={getRandomNumber}>{randomNumber}</button>
