<script lang="ts">
  import { pathToFileURL } from 'url'
  import { loadProtos, importProtoFilesFromFilePicker } from '../../behaviour'
  import path from 'path'
  import { createEventDispatcher } from 'svelte'
  import type { ProtoFile } from '../../behaviour'
  import { Button } from 'svelte-materialify'
  import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
  import type { PackageDefinition } from '@grpc/grpc-js/build/src/make-client'
  import { profile } from 'console'
  var protoLoader = require('@grpc/proto-loader')

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
    testLoadService()
    const protoFiles = await loadProtos([SAMPLE_PROT_PATH])
    console.dir(protoFiles)
    dispatcher('onProtoLoaded', protoFiles)
  }

  function testLoadService() {
    const packageDefinition: PackageDefinition = protoLoader.loadSync(
      SAMPLE_PROT_PATH,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    )
    console.log('package definition : ', packageDefinition)
    var hello_proto = loadPackageDefinition(packageDefinition)

    console.log('loaded package definition : ', hello_proto)
    hello_proto['service']
  }

  async function importProtoFiles() {
    importProtoFilesFromFilePicker()
      .then((protoFiles) => dispatcher('onProtoLoaded', protoFiles))
      .catch((e) => console.error(e))
  }
</script>

<Button on:click={importSampleProto}>Import sample Proto</Button>
<Button on:click={importProtoFiles}>Import real Proto Files</Button>
