<script lang="ts">
import type { RpcProtoInfo } from '../../behaviour';
import {appConfigStore , rpcProtoInfosStore} from '../../stores/index'
import {Button} from 'svelte-materialify'

const onRpcClick=(rpc: RpcProtoInfo)=>{
    appConfigStore.setSelectedRpc(rpc)
    console.log('rpc mock payload :>> ', rpc.mockRequestPayload);
    console.log('rpc mock payload :>> ', rpc.mockResponsePayload);
}
</script>

<h5>Rpc List</h5>

{#each $rpcProtoInfosStore as rpc}
  <Button on:click={(e) => onRpcClick(rpc)}>{rpc.methodName}</Button>
{/each}
