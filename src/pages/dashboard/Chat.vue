<template>
  <div class="h-full w-full flex overflow-scroll justify-center items-center">
    <div class="chat-page
                w-full
                h-full
                max-h-160
                max-w-160
                min-w-100
                min-h-20 ">
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