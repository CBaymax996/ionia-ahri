<template>
  <div class="bg-[#181d24] flex flex-row justify-between">
    <div class="w-100">
      <img :src="ioniaLogo" alt=""/>
    </div>

    <div class="flex flex-row justify-center items-center h-full w-25">
      <el-avatar :size="30"
                 fit="cover"
      >{{ getFirstWord }}
      </el-avatar>
      <el-dropdown>
        <p class="c-white mx-2">{{ user["nickname"] || user.username }}</p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout"> Logout</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>

</template>
<script setup>
import ioniaLogo from "~/assets/ionia.svg"
import {useCookies} from '@vueuse/integrations/useCookies'
import {UserInfoCookieKey} from "../config/LoginConfig";
import {computed, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import userApi from "../api/user"
import {router} from "../config/RouteConfig";

let cookies = useCookies();
let user = ref({
  username: "",
  nickname: "",
  roles: []
});

const logout = () => {
  userApi.logout()
  ElMessage({message: "用户已退出", type: "success"})
  router.push("/login")
}

onMounted(() => {
  user.value = cookies.get(UserInfoCookieKey)
})

const getFirstWord = computed(() => {
  let str = user.value.nickname == null ? user.value.username : user.value.nickname
  return str.substring(0, 1)
})
</script>

<style scoped>
/deep/ .el-avatar {
  color: #FFDEE9;
  background-color: #9599E2;
}
</style>
