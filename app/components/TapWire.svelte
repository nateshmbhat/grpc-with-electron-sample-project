<script>
  import { appConfigStore, protoFilesStore } from "../stores/index";

  import ImportProtoButton from "./buttons/ImportProtoButton.svelte";
  import RequestEditor from "./editor/RequestEditor.svelte";
import RpcSelector from "./rpcSelector/RpcSelector.svelte";

  const onProtoLoaded = (protoFiles) => {
    console.log(protoFiles);
    protoFilesStore.setProtoFiles(protoFiles);
  };
</script>

<RequestEditor />
<ImportProtoButton on:onProtoLoaded={(e) => onProtoLoaded(e.detail)} />
<RpcSelector/>
