<template>
  <div class="chat-frame h-full flex  flex-col justify-center relative ">
    <div id="chat-log" class="flex-1 mb-2 self-end overflow-y-auto w-full " @wheel=" throttle(handleWheel,time=100)">
      <Item v-for="(chatItem,index) in chatLog"
            :key="index"
            :avatar="chatItem.name==='BOT'?robotIcon:userIcon"
            :content="chatItem.text"
            :left="chatItem.name==='BOT'"
            :name="chatItem.name==='BOT'?'BOT':userName"
      />

    </div>
    <div v-show="isShowBackToBottom"
         class="back-to-bottom absolute bottom-23 h-5  left-1 right-1 text-center"
         @click="scrollToBottom()">
      回到底部
    </div>
    <div class="h-20 self-center w-full flex ">
      <textarea v-model="inputText" class="flex-1  border-none  text-lg c-gray-500" placeholder="请输入文本"/>
      <span class="bg-blue-300 c-gray-700 hover:bg-blue-400 hover:c-gray-100 m-2 rounded-2 w-20
              flex flex-col justify-center items-center "
            @click="sendMsg"
            @keyup.enter="sendMsg"
      >
        <div>发 送 <el-icon v-if="isLoading" class="animate-spin"><loading/></el-icon></div>
        SEND</span>
    </div>

  </div>
</template>


<script setup>

import Item from "~/components/chat/Item.vue"
import {useCookies} from '@vueuse/integrations/useCookies'
import {
  Loading
} from '@element-plus/icons-vue'

let cookies = useCookies();
// 头像资源
import userIcon from "~/assets/chat/user.jpg?url"
import robotIcon from "~/assets/chat/robot.svg?url"
import {onMounted, ref} from "vue";
import {throttle} from "~/utils/delay";
import {UserInfoCookieKey} from "~/config/LoginConfig";
import {ElMessage} from "element-plus";
import python from "../../api/python";


let isShowBackToBottom = ref(false)

let userName = ref("用户");

let inputText = ref("")
let isLoading = ref(false)
const chatLog = ref([
  {
    name: "BOT", text: "你好，我是对话机器人，有什么可以帮你的吗？",
  }
])

function handleWheel() {
  let chatLog = document.getElementById("chat-log");
  if (chatLog === undefined || chatLog == null) {
    isShowBackToBottom.value = false
  }
  isShowBackToBottom.value = chatLog.scrollTop < chatLog.scrollHeight - chatLog.clientHeight - 50;
}

function sendMsg() {

  if (inputText.value === "") {
    ElMessage({message: "请输入文本", type: "warning"})
    return;
  }
  isLoading.value = true
  chatLog.value.push({name: userName.value, text: inputText.value})
  python.chat(inputText.value).then((res) => {
    let data = res.data;
    if (data.success === true) {
      chatLog.value.push({name: "BOT", text: data.data})

    }

  }).finally(() => {
    isLoading.value = false
    inputText.value = ""
    scrollToBottom()
  })
  setTimeout(() => {


  }, 1000)

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
onMounted(() => {
  let user = cookies.get(UserInfoCookieKey)
  userName.value = user.nickname == null ? user.username : user.nickname
})
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

textarea {
  resize: none;
  outline: none;
}
</style>