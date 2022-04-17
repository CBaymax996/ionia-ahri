<template>
  <div class="chat-frame w-full h-full flex flex-col justify-between">
    <p>char frame</p>
    <div class="flex-1">
      <chat-item v-for="i in 5" :key="i"/>
    </div>
    <input-box class="h-20"></input-box>
  </div>
</template>
<style scoped>
.chat-frame > *{
  border: #0c1118 1px solid;
}
</style>

<script setup>
import ChatItem from "~/components/chat/ChatItem.vue";
import InputBox from "~/components/chat/InputBox.vue";
</script>

