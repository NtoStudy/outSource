<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'settings', 'feedback', 'logout', 'delete-all']);
</script>

<template>
  <div class="popover-content">
    <div class="menu-item">
      <el-icon><Iphone /></el-icon>
      <span>195****3747</span>
    </div>

    <div class="menu-item" @click="emit('settings')">
      <el-icon><Setting /></el-icon>
      <span>系统设置</span>
    </div>

    <div class="menu-item" @click="emit('delete-all')">
      <el-icon><Delete /></el-icon>
      <span>删除所有对话</span>
    </div>

    <div class="menu-item" @click="emit('feedback')">
      <el-icon><Message /></el-icon>
      <span>联系我们</span>
    </div>

    <div class="menu-item" @click="emit('logout')">
      <el-icon><SwitchButton /></el-icon>
      <span>退出登录</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popover-content {
  background-color: var(--bg-color);
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
    background-color: var(--hover-bg);
  }

    .el-icon {
      margin-right: 10px;
      font-size: 18px;
      color: var(--text-secondary);
    }

    span {
      font-size: 14px;
      color: var(--text-primary);
    }
  }
}
</style>
