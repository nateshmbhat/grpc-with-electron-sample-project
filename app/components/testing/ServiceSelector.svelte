<script lang="ts">
  import type { ProtoFile, ProtoService } from '../../behaviour/protobuf'
  import ImportProtoButton from '../buttons/ImportProtoButton.svelte'
  import { Button } from 'svelte-materialify'
  import { servicesStore } from '../../stores/protoInfo'
  import { startMockGrpcServer } from '../../behaviour/grpcServer'
  import { appConfigStore } from '../../stores'

  function onServiceSelected(service: ProtoService) {
    startMockGrpcServer($appConfigStore, [service.serviceDefinition])
  }

</script>

<h5>Service List</h5>

{#each $servicesStore as service}
  <Button on:click={(e) => onServiceSelected(service)}>
    {service.serviceName}
  </Button>
{/each}
