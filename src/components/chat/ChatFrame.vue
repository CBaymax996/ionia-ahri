<template>
  <div class="chat-frame h-full flex flex-col relative ">
    <div id="chat-log" class="flex-1 my-2 self-end overflow-y-auto " @wheel=" throttle(handleWheel)">
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？明天天气怎么样？明天天气怎么样？
      明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！`" left name="ROBOT"/>
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！明天15到26度，多云转小雨，
      出门记得带伞哦明天15到26度，多云转小雨，出门记
      得带伞哦明天15到26度，多云转小雨，出门记得带伞哦明天15到26度，多云转小雨，出门记得带伞哦`" left name="ROBOT"/>
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！`" left name="ROBOT"/>
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！`" left name="ROBOT"/>
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！`" left name="ROBOT"/>
      <Item :avatar="robotIcon" :content="`你好，我是对话机器人，有什么可以帮你的吗？`" left name="ROBOT"/>
      <Item :avatar="userIcon" :content="`明天天气怎么样？`" name="管理员"/>
      <Item :avatar="robotIcon" :content="`明天15到26度，多云转小雨，出门记得带伞哦！`" left name="ROBOT"/>
    </div>
    <div v-show="isShowBackToBottom"
         class="back-to-bottom absolute bottom-23 h-5  left-1 right-1 text-center"
         @click="scrollToBottom()">
      回到底部
    </div>

    <div class="h-20 flex">

      {{ isShowBackToBottom }}
      <input class=" flex-1 border-none  h-full"/>
      <span class="bg-blue-400 c-gray-700 m-2 rounded-2 w-20 flex flex-col justify-center items-center "
      >
        <div class="tracking-1 ">发送</div>ENTER</span>
    </div>

  </div>
</template>


<script setup>

import Item from "~/components/chat/Item.vue"
// 头像资源
import userIcon from "~/assets/chat/user.jpg?url"
import robotIcon from "~/assets/chat/robot.svg?url"
import {onMounted, ref} from "vue";
import {throttle, debounce} from "~/utils/delay";

let isShowBackToBottom = ref(false)


function handleWheel() {
  let chatLog = document.getElementById("chat-log");
  if (chatLog === undefined || chatLog == null) {
    isShowBackToBottom.value = false
  }
  isShowBackToBottom.value = chatLog.scrollTop < chatLog.scrollHeight - chatLog.clientHeight - 50;
}


/**
 * 回到聊天底部按钮
 * 跳转到最下面的聊天记录
 * */

function scrollToBottom() {
  let chatLog = document.getElementById("chat-log");
  chatLog.scrollTop = chatLog.scrollHeight;
  isShowBackToBottom.value = false;
}

onMounted(() => scrollToBottom())


</script>

<style scoped>
.chat-frame > * {
  border: #0c1118 2px solid;
}

.chat-frame .back-to-bottom {
  border: none;
  color: black;
  border-radius: 100%;
  background-color: #FF9A8B;
  background-image: linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
  opacity: 40%;
}

#chat-log {
  scroll-behavior: smooth;
}

</style>