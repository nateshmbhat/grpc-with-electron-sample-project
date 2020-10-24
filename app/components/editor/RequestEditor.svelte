<script lang="ts">
  import {AceEditor} from "svelte-ace";
  import * as ace from "brace";
  require("brace/mode/json");
  require("brace/theme/clouds_midnight");

  let width = "100";
  $: widthString = width + "%";

  let editorText = "Hello its me";
  let lang = "json";
  let options = {};
</script>

<input style="width:100%" type="range" bind:value={width} />

<div>
  <AceEditor
    value="hello"
    theme="clouds_midnight"
    {lang}
    width="400"
    height="512" />
</div>
