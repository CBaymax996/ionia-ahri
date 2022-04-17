<template>
  <div class="h-full w-full flex flex-col justify-center  items-center ">
    <div class="flex items-between ">
      <ToyCard/>
    </div>
    <h1 class="
    flex-1
       text-10
       text-[#3182bd]
"
    >请点击左侧功能菜单定制任务型对话系统</h1>



  </div>

</template>

<script setup>
import {useTitle} from "@vueuse/core/index";
import ToyCard from "~/components/toy/card.vue";

useTitle("Home Page")

</script>

<!--@formatter:off-->
<route lang="yaml">
alias:
- /
- /index
meta:
 layout: Dashboard
</route>
