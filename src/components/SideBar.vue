<template>
  <div class="sidebar flex flex-col justify-between">

    <el-menu
        router
        class="el-menu"
        background-color="#0c1118"
        text-color="#fff"
        active-text-color=" #a0cfff"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >

      <el-menu-item disabled index="1">
        <el-icon>
          <Compass/>
        </el-icon>
        <template #title>意图管理</template>
      </el-menu-item>
      <el-menu-item index="/dashboard/service">
        <template #title>
          <el-icon>
            <Link/>
          </el-icon>
          <span>服务管理</span>
        </template>
      </el-menu-item>
      <el-menu-item disabled index="3">
        <el-icon>
          <Scissor/>
        </el-icon>
        <template #title>词槽管理</template>
      </el-menu-item>

      <el-menu-item disabled index="4">
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
import {ref} from 'vue'
import {
  Compass,
  Scissor,
  Files,
  Link,
  ChatRound,
  ArrowLeftBold,
  ArrowRightBold
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

function handleStretch() {
  isCollapse.value = !isCollapse.value
}

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