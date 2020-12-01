<script lang="ts">
  import { appConfigStore, NetworkTapMode } from '../../stores'
  import { LiveEditState } from '../../stores'
  import { Button } from 'svelte-materialify'

  $: networkTapMode = $appConfigStore.networkTapMode
  const changeMode = (e: any) => {
    const mode =
      networkTapMode == NetworkTapMode.passThrough
        ? NetworkTapMode.liveEdit
        : NetworkTapMode.passThrough
    appConfigStore.setNetworkTapMode(mode)
  }

  const sendRequest = (e: any) => {
    appConfigStore.setRequestLiveEditState(LiveEditState.sendInitiated)
  }
</script>

<Button on:click={changeMode}>{networkTapMode}</Button>

{#if networkTapMode == NetworkTapMode.liveEdit}
  <Button on:click={sendRequest}>Send Request</Button>
{/if}
