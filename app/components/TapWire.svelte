<script>
  import { protosStore } from "../stores/protos";

  import ImportProtoButton from "./buttons/ImportProtoButton.svelte";
  import RequestEditor from "./editor/RequestEditor.svelte";

  const onProtoLoaded = (protoFiles) => {
    console.log(protoFiles);
  };
</script>

<RequestEditor />
{$protosStore}
<ImportProtoButton on:onProtoLoaded={(e) => onProtoLoaded(e.detail)} />
