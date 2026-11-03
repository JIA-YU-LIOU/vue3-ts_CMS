<template>
  <div class="hy-code">
    <pre
      class="bg"
    ><code class="hljs" :class="`language-${language}`" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script lang="ts" setup>
import 'highlight.js/styles/dark.css'
import hljs from 'highlight.js'
import { computed } from 'vue'
interface IProps {
  language: string
  code: string
}
const props = defineProps<IProps>()
const highlightedCode = computed(() => {
  return hljs.highlight(props.code, { language: props.language }).value
})
</script>

<style scoped lang="scss">
.bg {
  padding: 10px;
  text-align: left;
}
</style>
