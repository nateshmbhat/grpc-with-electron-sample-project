<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import type { RpcProtoInfo } from "../../behaviour";
  import { appConfigStore } from "../../stores";
  require("brace/mode/json");
  require("brace/theme/chrome");
  export let width = "100%";
  const lang = "json", theme = "chrome";

  $: selectedRpc = $appConfigStore.selectedRpc;
  $: requestMessage = JSON.stringify(selectedRpc?.mockRequestPayload.plain ?? { } , null , 2)
  $:{
    console.log('request message : ' , requestMessage)
  }
</script>

<AceEditor
  on:input={(e) => (requestMessage = e.detail)}
  value={requestMessage}
  {theme}
  {width}
  {lang}
  height="512" />
