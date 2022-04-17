<template>
  <div class="flex h-full w-full justify-center item-center">
    <div class=" h-150 w-120 self-center">
      <ChatFrame/>
    </div>
  </div>
</template>

<script setup>
import ChatFrame from "~/components/chat/ChatFrame.vue"
</script>

<!--@formatter:off-->
<route lang="yaml">
meta:
  layout: Dashboard
</route>