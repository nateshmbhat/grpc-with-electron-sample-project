<script lang="ts">
import type { ProtoFile } from "../behaviour";

  import { appConfigStore, protoFilesStore } from "../stores/index";

  import ImportProtoButton from "./buttons/ImportProtoButton.svelte";
  import RequestEditor from "./editor/RequestEditor.svelte";
  import ResponseEditor from "./editor/ResponseEditor.svelte";
  import RpcSelector from "./testing/RpcSelector.svelte";
import ServiceSelector from "./testing/ServiceSelector.svelte";

  const onProtoLoaded = (protoFiles:ProtoFile[]) => {
    console.log(protoFiles);
    protoFilesStore.setProtoFiles(protoFiles);
  };
</script>

<style>
  div.request-response-holder {
      display: flex;
  }
</style>

<div class="request-response-holder">
  <RequestEditor width="50%" />
  <ResponseEditor width="50%" />
</div>

<ImportProtoButton on:onProtoLoaded={(e) => onProtoLoaded(e.detail)} />
<RpcSelector />
<ServiceSelector/>
