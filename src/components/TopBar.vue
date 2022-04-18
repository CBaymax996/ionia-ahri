<template>
  <div class="bg-[#181d24] flex flex-row justify-between">
    <div class="w-100">
      <img alt="" src="/src/assets/ionia.svg"/>
    </div>

    <div class="flex flex-row h-full bg-white">
      <el-icon class="w-20" size="10px">
        <User/>
      </el-icon>
      <p>管理员</p>
    </div>
  </div>

</template>
<script setup>
import {User}  from '@element-plus/icons-vue'
</script>
