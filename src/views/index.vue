<script setup>
import SideBar from "@/components/sidebar/index.vue";
import ChatWindow from "@/components/chat/ChatWindow.vue";
</script>

<template>
  <div class="chat-container">
    <!-- 侧边栏 -->
    <SideBar />
    <!-- 聊天窗口 -->
    <ChatWindow />
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
