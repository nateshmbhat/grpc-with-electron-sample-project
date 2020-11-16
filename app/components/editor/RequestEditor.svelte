<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import type { RpcProtoInfo } from "../../behaviour";
  import { appConfigStore } from "../../stores";
  require("brace/mode/json");
  require("brace/theme/chrome");
  let selectedRpc : RpcProtoInfo |null = null;

  let width = "100";
  const lang = "json",
    theme = "chrome"

  $: selectedRpc = $appConfigStore.selectedRpc;
  $: requestMessage = JSON.stringify($appConfigStore.selectedRpc?.mockRequestPayload.plain ?? {})
  $:{
    console.log('request message : ' , requestMessage)
  }
</script>

<AceEditor
  on:input={(e) => (requestMessage = e.detail)}
  value={requestMessage}
  {theme}
  {lang}
  height="512" />
