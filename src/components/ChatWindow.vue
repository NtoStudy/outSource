<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import MessageItem from './MessageItem.vue';
import MessageInput from './MessageInput.vue';
// 模拟消息数据
const messages = ref([
  {
    id: 1,
    content: "你好，请问您的问题是什么？",
    sender: "ai",
    avatar: ""
  },
  {
    id: 2,
    content: "我是Kimi，你的AI智能助手。",
    sender: "ai",
    avatar: ""
  },
  {
    id: 3,
    content: "你是谁",
    sender: "user",
    avatar: ""
  },
  {
    id: 4,
    content: "2023年10月19日",
    sender: "ai",
    avatar: ""
  },
  {
    id: 5,
    content: "我是Kimi，你的AI智能助手。",
    sender: "ai",
    avatar: ""
  },
  {
    id: 6,
    content: "你是谁",
    sender: "user",
    avatar: ""
  },
  {
    id: 7,
    content: "2023年10月19日",
    sender: "ai",
    avatar: ""
  },
  {
    id: 8,
    content: "我是Kimi，你的AI智能助手。",
    sender: "ai",
    avatar: ""
  },
  {
    id: 9,
    content: "你是谁",
    sender: "user",
    avatar: ""
  },
  {
    id: 10,
    content: "2023年10月19日",
    sender: "ai",
    avatar: ""
  },
]);

const handleSendMessage = (content) => {
  // 添加用户消息
  messages.value.push({
    id: messages.value.length + 1,
    content,
    sender: "user",
    timestamp: new Date().toISOString(),
    avatar: ""
  });

  // 滚动到底部
  scrollToBottom();

  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      content: "我是您的AI助手，很高兴为您服务！",
      sender: "ai",
      timestamp: new Date().toISOString(),
      avatar: ""
    });
    // 滚动到底部
    scrollToBottom();
  }, 1000);
};

// 滚动到底部函数
const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
    }
  });
};

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="header-title">AI 助手</div>
      <div class="header-actions">
        <el-button size="small" type="text">
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="message-list" ref="messageListRef">
      <div class="message-list-container">
        <MessageItem
            v-for="message in messages"
            :key="message.id"
            :message="message"
        />
      </div>
    </div>

    <MessageInput @send-message="handleSendMessage" />
  </div>
</template>
<style scoped lang="scss">
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color:#f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;

  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(245,247,250,0.8));

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .message-list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10px;
  }
}
</style>
