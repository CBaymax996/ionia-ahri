<template>
  <main class="w-screen h-screen flex flex-col ">
    <TopBar class="h-20"/>
    <div class="h-full w-full flex ">
      <SideBar class="h-full flex-initial"/>
      <div class="h-full flex-1 flex flex-col">
        <div class="h-full w-full ">
          <RouterView/>
        </div>
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
