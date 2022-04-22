<template>
  <div :class="left?'left':'right'" class="chat-item flex p-2">
    <img :src="avatar" alt="" class="icon w-10 h-10 mx-1" oncontextmenu="return false;"
         ondragstart="return false;"/>
    <div class="flex flex-col ">
      <span class="name px-2">{{ name }}</span>
      <span class="content p-4 break-all">{{ content }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: String,
  name: String,
  left: Boolean,
  avatar: String
})
</script>


<style scoped>

/* 左右方向*/
.right {
  flex-direction: row-reverse;
  padding-left: 50px;
}

.left {
  padding-right: 50px;
}

.right > * {
  align-items: flex-end;
}


.name {
  color: #818181;
  font-size: 15px;
  display: block;
  line-height: 18px;
}


/* 圆头像 */
img.icon {
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  background-color: rgba(221, 227, 239, 0.85);
}

/* 气泡框 */
.right .content {
  -webkit-border-radius: 20px 0 20px 20px;
  border-radius: 20px 0 20px 20px;
  color: white;
  background: linear-gradient(45deg, #37ecba 0%, #72afd3 100%);
  -webkit-box-shadow: 5px 5px 15px 0 rgba(102, 102, 102, 0.15);
  box-shadow: 5px 5px 15px 2px rgba(102, 102, 102, 0.4);
}

.left .content {
  -webkit-border-radius: 0 20px 20px 20px;
  border-radius: 0 20px 20px 20px;
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
  -webkit-box-shadow: 5px 5px 15px 0 rgba(102, 102, 102, 0.1);
  box-shadow: 5px 5px 15px 2px rgba(102, 102, 102, 0.3);
}

</style>
