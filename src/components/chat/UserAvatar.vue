<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'user' // 'login.js' 或 'ai'
  }
});
</script>

<template>
  <div class="avatar" :class="{ 'ai-avatar': type === 'ai', 'user-avatar': type === 'user' }">
    <img v-if="src" :src="src" alt="avatar" />
    <el-icon v-else-if="type === 'ai'"><ChatDotRound /></el-icon>
    <el-icon v-else><User /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &.ai-avatar {
    background-color: var(--bg-secondary);
    color: var(--primary-color);
  }

  &.user-avatar {
    background-color: var(--bg-secondary);
    color: var(--text-secondary)
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .el-icon {
    font-size: 20px;
  }
}
</style>
