<script lang="ts">
  export let name: string = "hello";
  import { readdirSync } from "fs";
  let files: string[] = [];

  const loadFiles = (e) => {
    files = readdirSync(".");
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

<h1>Hello {name}!</h1>
<p>Hello its me sdlkjfdksf</p>
<h1>sdfsdfds</h1>
<button on:click|preventDefault={loadFiles}>click me</button>
<p>{files}</p>
