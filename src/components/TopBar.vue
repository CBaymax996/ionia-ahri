<template>
  <div class="bg-[#181d24] flex flex-row justify-between">
    <div class="w-100">
      <img alt="" src="/src/assets/ionia.svg"/>
    </div>

    <div class="flex flex-row justify-center items-center h-full w-25">
      <el-avatar :size="30"
                 :src="userIcon"
                 fit="cover"
      />
      <p class="c-white mx-2">管理员</p>
    </div>
  </div>

</template>
<script setup>
import userIcon from '~/assets/chat/user.jpg?url'

</script>
