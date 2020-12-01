<script lang="ts">
  import { AceEditor } from 'svelte-ace'
  import { requestResponseEditorStore } from '../../stores/appConfigStore'
  require('brace/mode/json')
  require('brace/theme/chrome')
  export let width = '100%'
  const lang = 'json',
    theme = 'chrome'

  $: responseMessage = $requestResponseEditorStore.responseText
  const onEditorTextChanged = (msg: string) =>
    requestResponseEditorStore.setResponse(msg)
</script>

<AceEditor
  on:input={(e) => onEditorTextChanged(e.detail)}
  value={responseMessage}
  {theme}
  {width}
  {lang}
  height="512" />
