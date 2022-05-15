<template>
  <div class="sidebar flex flex-col justify-between">

    <el-menu
        router
        class="el-menu"
        background-color="#0c1118"
        text-color="#fff"
        active-text-color=" #a0cfff"
        :collapse="isCollapse"
    >
      <el-menu-item index="/dashboard/service">
        <template #title :disabled="!isAdmin">
          <el-icon>
            <Link/>
          </el-icon>
          <span>服务管理</span>
        </template>
      </el-menu-item>
      <el-menu-item :disabled="!isAdmin" index="/dashboard/intent">
        <el-icon>
          <Compass/>
        </el-icon>
        <template #title>意图管理</template>
      </el-menu-item>


      <el-menu-item :disabled="!isAdmin" index="/dashboard/template">
        <el-icon>
          <Files/>
        </el-icon>
        <template #title>模板管理</template>
      </el-menu-item>


      <el-menu-item index="/dashboard/chat">
        <el-icon>
          <ChatRound/>
        </el-icon>
        <template #title>人机对话</template>
      </el-menu-item>
    </el-menu>

    <!--展开收起按钮-->
    <div class="h-10 flex justify-center w-full bg-[#05172b]">
      <el-icon size="24px" class="self-center" color="#818c97">
        <ArrowRightBold v-if="isCollapse" @click="handleStretch"/>
        <ArrowLeftBold v-else @click="handleStretch"/>
      </el-icon>
    </div>
  </div>
</template>


<script setup>
import {computed, onMounted, ref} from 'vue'

import {
  Compass,
  Scissor,
  Files,
  Link,
  ChatRound,
  ArrowLeftBold,
  ArrowRightBold
} from '@element-plus/icons-vue'
import {useCookies} from "@vueuse/integrations/useCookies";
import {UserInfoCookieKey} from "../config/LoginConfig";

let cookies = useCookies();
let user = ref({
  username: "",
  nickname: "",
  roles: []
});

const isCollapse = ref(false)
const isAdmin = computed(() => {
  let b = false;
  user.value['roles'].forEach((role) => {
    if (role.name === "admin") {
      b = true
    }
  })
  return b
})

function handleStretch() {
  isCollapse.value = !isCollapse.value
}

onMounted(() => {
  user.value = cookies.get(UserInfoCookieKey)
})
</script>
<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item.is-active {
  background-color: #363636;
}


.sidebar {
  background-color: #0c1118;
  color: white;
}

.sidebar * {
  font-size: 16px;
}

</style>