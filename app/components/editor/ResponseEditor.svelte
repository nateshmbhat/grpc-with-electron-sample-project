<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import { appConfigStore } from "../../stores";
  require("brace/mode/json");
  require("brace/theme/chrome");
  export let width = "100%";
  const lang = "json",
    theme = "chrome";

  $: selectedRpc = $appConfigStore.selectedRpc;
  $: responseMessage = JSON.stringify(
    selectedRpc?.mockResponsePayload.plain ?? {},
    null,
    2
  );
  $: {
    console.log("response message : ", responseMessage);
  }
</script>

<AceEditor
  on:input={(e) => (responseMessage = e.detail)}
  value={responseMessage}
  {theme}
  {width}
  {lang}
  height="512" />
