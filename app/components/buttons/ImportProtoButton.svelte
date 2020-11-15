<script lang="ts">
  import { pathToFileURL } from 'url'
  import { loadProtos } from '../../behaviour/importProtos'
  import path from 'path'
  import { createEventDispatcher } from 'svelte'
  import type { ProtoFile } from '../../behaviour/protobuf'
  import { Button } from 'svelte-materialify'
  import { ProtoInfo } from '../../behaviour/protoInfo'
  const SAMPLE_PROT_PATH = path.join(
    //@ts-ignore
    __static,
    'sample',
    'greeter-service.proto',
  )

  var dispatcher = createEventDispatcher<{ onProtoLoaded: ProtoFile[] }>()

  //@ts-ignore
  const staticPath = __static
  const importSampleProto = async () => {
    const protoFiles = await loadProtos([SAMPLE_PROT_PATH])
    console.dir(protoFiles)
    dispatcher('onProtoLoaded', protoFiles)
  }
</script>

<Button on:click={importSampleProto}>Import Proto</Button>
