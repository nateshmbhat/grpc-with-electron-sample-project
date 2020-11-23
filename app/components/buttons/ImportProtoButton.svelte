<script lang="ts">
  import { pathToFileURL } from 'url'
  import { loadProtos } from '../../behaviour/importProtos'
  import path from 'path'
  import { createEventDispatcher } from 'svelte'
  import type { ProtoFile } from '../../behaviour/protobuf'
  import { Button } from 'svelte-materialify'
  import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import type { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
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
    const packageDefinition : PackageDefinition = protoLoader.loadSync(SAMPLE_PROT_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
    console.log('package definition : ' , packageDefinition)
    var hello_proto = loadPackageDefinition(packageDefinition)
  
    console.log('loaded package definition : ' , hello_proto)
    hello_proto['service']
  }
</script>

<Button on:click={importSampleProto}>Import Proto</Button>
