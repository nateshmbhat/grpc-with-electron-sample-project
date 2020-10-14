<script lang="ts">
  import { importAndParseProto } from "./behavior/protoImporter";

  export let name: string = "hello";
  let files: string[] = [];

  const loadFiles = (e) => {
    importAndParseProto();
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
