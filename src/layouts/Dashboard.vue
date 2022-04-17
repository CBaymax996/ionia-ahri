<template>
  <main class="flex flex-col w-screen h-screen">
    <TopBar class="h-20"/>
    <div class="h-full flex">
      <SideBar class="flex-initial"/>
      <div class="flex flex-1 flex-col">
        <RouterView class="flex-1"/>
        <Footer class="h-8"/>
      </div>
    </div>

  </main>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import TopBar from "../components/TopBar.vue";
import {useTitle} from "@vueuse/core/index";

useTitle("Dashboard")
</script>
