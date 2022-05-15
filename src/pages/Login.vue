<template>
  <div class="login-page h-screen w-screen bg-cover flex justify-center items-center"
       :style="{'background-image': `url(${bgImg})`}"
  >
    <!--登陆框-->
    <div class="login-box flex flex-col justify-center w-70 px-25 py-15">
      <!--logo-->
      <div>
        <img alt="#" src="/src/assets/ionia.svg"/>
      </div>
      <!-- 登陆表单-->
      <el-form :model="formData" class="login-form w-full self-center">
        <el-input v-model="formData.username" class="input" placeholder="username"/>
        <el-input v-model="formData.password" class="input" placeholder="password" show-password type="password"/>
        <div class="flex justify-between items-center">
          <a class="login-button  px-5 py-1" @click="onSubmit">login</a>
          <a class="no-underline text-center text-sm	c-white capitalize" href="#">forget?</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>

import {useTitle} from "@vueuse/core/index";
import {useCookies} from '@vueuse/integrations/useCookies'
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {LoginCookieKey} from '~/config/LoginConfig'

import bgImg from "~/assets/buaa.jpeg"
import {router} from "../config/RouteConfig";
import user from "../api/user";
import {UserInfoCookieKey} from "../config/LoginConfig";

useTitle("Login Page")
const cookies = useCookies()

// 表单内容
let formData = ref({
  username: "",
  password: ""
})


function onSubmit() {
  let username = formData.value.username;
  let password = formData.value.password
  // 获取token

  Promise.resolve()
      .then(() => user.login(username, password))
      .then((res) => {
            let data = res.data
            if (data.success === true) {
              cookies.set(LoginCookieKey, res.headers['authorization'])
              ElMessage({message: data.data, type: "success"})
            } else {
              ElMessage({message: data.message, type: "error"})
            }
          }
      )
      .then(() => user.get(username))
      .then(res => {
        let data = res.data
        if (data.success === true) {
          cookies.set(UserInfoCookieKey, data.data)
        }
      }).then(() => {
    router.push("/")
  })


}
</script>

<style scoped>
* {
  /*禁用选择*/
  user-select: none;
}

.login-box {
  background: linear-gradient(325deg, rgba(13, 143, 133, 0.8), rgba(18, 70, 155, 0.9));
  border-radius: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2),
  0 10px 20px rgba(0, 0, 0, 0.3),
  0 30px 60px 1px rgba(0, 0, 0, 0.5);
}

/*输入框格式*/
/deep/ .el-input {
  display: block;
  border: none;
  width: 100%;
  font-size: 1em;
  margin: 20px 0;
  font-family: Assiatant, sans-serif;
}

/deep/ .el-input__inner {
  background-color: transparent !important;
  border: none;
  box-shadow: 0 1px 0 0 white;
  outline: none;
  border-radius: 0;
  color: white;
  letter-spacing: 0.045em;
}

/deep/ .el-input__suffix {
  --el-input-icon-color: #CCCCCC !important;
  --el-input-clear-hover-color: white !important;
}


.login-form *::placeholder {
  color: #BBBBBB;
}


.login-form .login-button {
  text-transform: capitalize;
  letter-spacing: 0.045em;
  color: white;
  box-shadow: 0 0 0 2px white;
  border-radius: 3px;
}

.login-form .login-button:hover {
  background-color: white;
  transition: 0.5s;
  color: gray;
}


</style>