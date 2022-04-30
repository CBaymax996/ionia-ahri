<template>
  <div class="bg-[#181d24] flex flex-row justify-between">
    <div class="w-100">
      <img :src="ioniaLogo" alt=""/>
    </div>

    <div class="flex flex-row justify-center items-center h-full w-25">
      <el-avatar :size="30"
                 fit="cover"
      >管
      </el-avatar>
      <p class="c-white mx-2">管理员</p>
    </div>
  </div>

</template>
<script setup>
import ioniaLogo from "~/assets/ionia.svg"

</script>

<style scoped>
/deep/ .el-avatar {
  color: #FFDEE9;
  background-color: #9599E2;
}
</style>
