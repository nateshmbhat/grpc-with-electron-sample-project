<script lang="ts">
  import { loadProtos } from "../../behaviour/importProtos";
import type { ProtoFile } from "../../behaviour/protobuf";
import ImportProtoButton from "../buttons/ImportProtoButton.svelte";
import {ProtoInfo} from '../../behaviour/protoInfo'

const handleProtoFiles = (protoFiles :ProtoFile[])=>{
    protoFiles.forEach(protoFile=>{
        const sampleService = protoFile.services[0] ; 
        const protoInfo = new ProtoInfo(sampleService ,sampleService.methodsName[0]);
        console.dir(protoInfo)
    })
}


</script>

<ImportProtoButton on:protoFilesLoaded={e=> handleProtoFiles(e.detail)} />
