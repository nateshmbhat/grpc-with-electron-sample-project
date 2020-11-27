<script lang="ts">
  import { AceEditor } from 'svelte-ace'
  import { requestResponseEditorStore } from '../../stores/appConfigStore'
  require('brace/mode/json')
  require('brace/theme/chrome')
  export let width = '100%'
  const lang = 'json',
    theme = 'chrome'

  $: requestMessage = $requestResponseEditorStore.requestText
</script>

<AceEditor
  on:input={(e) => (requestMessage = e.detail)}
  value={requestMessage}
  {theme}
  {width}
  {lang}
  height="512" />
