<template>
  <div class="sidebar flex flex-col justify-between item-center">

    <el-menu
        class="el-menu"
        background-color="#0c1118"
        text-color="#fff"
        active-text-color=" #a0cfff"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >

      <el-menu-item index="1">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <template #title>意图管理</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>服务管理</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <template #title>意图管理</template>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <el-icon>
          <document/>
        </el-icon>
        <template #title>词槽管理</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>对话模板管理</template>
      </el-menu-item>
    </el-menu>

    <!--展开收起按钮-->
    <div class="h-12 flex justify-center w-full bg-[#05172b]">
      <el-icon size="24px" class="self-center" color="#818c97">
        <ArrowRightBold v-if="isCollapse" @click="isCollapse=!isCollapse"/>
        <ArrowLeftBold v-else @click="isCollapse=!isCollapse"/>
      </el-icon>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {
  Document,
  Menu as IconMenu,
  ArrowLeftBold,
  ArrowRightBold,
  Location,
  Setting,
  DArrowLeft
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
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
</style>