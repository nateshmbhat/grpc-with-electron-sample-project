<script>
  import { appConfigStore, protoFilesStore } from "../stores/index";

  import ImportProtoButton from "./buttons/ImportProtoButton.svelte";
  import RequestEditor from "./editor/RequestEditor.svelte";
  import ResponseEditor from "./editor/ResponseEditor.svelte";
  import RpcSelector from "./rpcSelector/RpcSelector.svelte";

  const onProtoLoaded = (protoFiles) => {
    console.log(protoFiles);
    protoFilesStore.setProtoFiles(protoFiles);
  };
</script>

<style>
  div.request-response-holder {
    color: blue;
  }
</style>

<div class="request-response-holder">
  Hello
  <RequestEditor width="50%" />
  <ResponseEditor width="50%" />
</div>

<ImportProtoButton on:onProtoLoaded={(e) => onProtoLoaded(e.detail)} />
<RpcSelector />
