<template>
  <div class="h-screen w-screen bg-cover flex justify-center items-center"
       style="background-image: url('./public/buaa.jpeg')"
  >
    <!--登陆框-->
    <div class="login-box flex flex-col justify-center w-70 px-25 py-15">
      <!--logo-->
      <div >
        <img src="/public/ionia.svg" alt="#"/>
      </div>

      <!-- 登陆表单-->
      <div class="login-form w-full self-center">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password">
        <div class="flex justify-between items-center">
          <a class="login-button  px-5 py-1">login</a>
          <a class="no-underline text-center text-sm	c-white capitalize" href="#">forget?</a>
        </div>
      </div>
    </div>
  </div>
</template>
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
.login-form input {
  display: block;
  border: none;
  width: 100%;
  box-shadow: 0 1px 0 0 white;
  background: none;
  color: white;
  outline: none;
  font-size: 1em;
  margin: 20px 0;
  font-family: Assiatant, sans-serif;
  letter-spacing: 0.045em;
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
<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {useTitle} from "@vueuse/core/index";

useTitle("Login Page")

// 表单内容
let formData = ref({
  username: "",
  password: ""
})


function onSubmit() {
  ElMessage({message: "登陆成功", type: "success"})
}
</script>

