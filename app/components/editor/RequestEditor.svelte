<script lang="ts">
  import { AceEditor } from 'svelte-ace'
  require('brace/mode/json')
  require('brace/theme/chrome')

  let width = '100'
  const lang = 'json',
    theme = 'chrome'
</script>

<AceEditor {theme} {lang} height="512" />
