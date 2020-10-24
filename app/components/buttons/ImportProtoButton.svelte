<script lang="ts">
import { pathToFileURL } from "url";

  import { loadProtos } from "../../behaviour/importProtos";
  import path from 'path'
  //@ts-ignore
  const SAMPLE_PROT_PATH = path.join( __static , 'sample', 'greeter-service.proto')  

  //@ts-ignore
  const staticPath= __static;
  const importSampleProto = async () => {
      const protoFiles = await loadProtos([SAMPLE_PROT_PATH])
      console.dir(protoFiles);
  };
</script>

<button on:click={importSampleProto}>Import Proto </button>