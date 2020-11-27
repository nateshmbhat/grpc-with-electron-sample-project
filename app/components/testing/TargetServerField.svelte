<script lang="ts">
  import { appConfigStore } from '../../stores/index'
  $: targetServer = $appConfigStore.targetGrpcServerUrl
</script>

<input
  on:input={(e)=>appConfigStore.setTargetGrpcServerUrl(e.currentTarget.value)}
  value={targetServer}
  placeholder="Target server" />
