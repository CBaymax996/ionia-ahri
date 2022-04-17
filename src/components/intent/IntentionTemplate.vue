<template>
  <div class="intention-template">
    <h1>意图模板</h1>
    <IntentionTemplateEditor v-bind:template="template" v-bind:slots="slots"/>

    <hr/>
    <IntentionTemplateEditor v-bind:template="template" v-bind:slots="slots"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import IntentionTemplateEditor from "~/components/intent/IntentionTemplateEditor.vue";
import mock_intent from "~/mock/intentionTemplate"

let slots = ref(mock_intent.slots)
let template = ref(mock_intent.template_1)

console.log(mock_intent)
console.log(template)

</script>

<style scoped>
.intention-template {
  margin: 0 auto;
  width: 50%;
}
</style>