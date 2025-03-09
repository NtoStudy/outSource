<script setup>
import ChatWindow from '@/components/ChatWindow.vue';
</script>

<template>
  <div class="chat-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-item active">
        <el-icon><HomeFilled /></el-icon>
      </div>
      <div class="sidebar-item">
        <el-icon><Document /></el-icon>
      </div>
      <div class="sidebar-item">
        <el-icon><Setting /></el-icon>
      </div>
      <div class="sidebar-item">
        <el-icon><User /></el-icon>
      </div>
    </div>

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

.sidebar {
  width: 60px;
  background-color: #fff;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  .sidebar-item {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    cursor: pointer;
    color: var(--light-text);

    &:hover, &.active {
      background-color: var(--hover-color);
      color: var(--primary-color);
    }
  }
}
</style>
