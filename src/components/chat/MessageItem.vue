<script setup>
import { defineProps } from 'vue';
import UserAvatar from './UserAvatar.vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
    // 消息对象结构
    // {
    //   id: Number,
    //   content: String,
    //   sender: String, // 'ai' 或 'login.js'
    //   timestamp: String,
    //   avatar: String,
    // }
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
</script>

<template>
  <div class="message-item" :class="{ 'ai-message': message.sender === 'ai', 'user-message': message.sender === 'user' }">
    <UserAvatar :src="message.avatar" :type="message.sender" />

    <div class="message-wrapper">
      <div class="message-content">
        {{ message.content }}
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
// 消息项容器
.message-item {
  display: flex;
  margin-bottom: 20px;
  width: 100%;

  // 用户消息样式
  &.user-message {
    flex-direction: row-reverse;

    .message-wrapper {
      margin-left: 0;
      margin-right: 10px;
      align-items: flex-end;
    }

    .message-content {
      background-color: var(--bg-secondary);
      margin-left: auto;
    }
  }

  // AI消息样式
  &.ai-message {
    .message-content {
      background-color: var(--bg-secondary);
    }
  }
}

// 消息包装器
.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  max-width: 60%;
}


// 消息内容
.message-content {
  padding: 12px 16px;
  border-radius: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  display: inline-block;
  max-width: 100%;
}

// 消息操作按钮
.message-actions {
  display: flex;
  gap: 15px;
  margin-top: 5px;

  .action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--light-text);
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }

    .el-icon {
      font-size: 14px;
    }
  }
}
</style>
