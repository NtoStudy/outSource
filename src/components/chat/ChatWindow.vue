<script setup>
import {ref, onMounted, nextTick, watch} from 'vue';
import MessageItem from './MessageItem.vue';
import MessageInput from './MessageInput.vue';
import {useChatStore} from "@/store/chat.js";
import {useRoute} from "vue-router";
import {newMathChatApi} from "@/api/ai.js";
import router from "@/router/index.js";

const route = useRoute();
const chatStore = useChatStore();
const messageListRef = ref(null);
const messages = ref([]);
// 滚动到底部函数
const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
    }
  });
};
// 监听store中的消息变化
watch(() => chatStore.messages, (newMessages) => {
  messages.value = newMessages;
}, {deep: true, immediate: true});
watch(() => route.params.id, (newId) => {
  if (newId && newId !== 'empty') {
    chatStore.setCurrentSessionId(newId);
  } else if (newId === 'empty') {
    chatStore.setCurrentSessionId(null);
    chatStore.setMessages([{
      avatar: "",
      content: "你好！有什么数学问题需要我帮忙解答吗？",
      sender: "ai",
      timestamp: new Date().toISOString(),
    }])
  }
}, {immediate: true});

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
});

const handleSendMessage = async (content) => {

  chatStore.addMessage({
    content,
    sender: 'user',
    timestamp: new Date().toISOString(),
    avatar: ''
  });
  scrollToBottom();
  if (route.params.id === 'empty') {
    const res = await newMathChatApi("", content);
    const responseData = res.data.data;
    if (responseData && responseData.includes(':::')) {
      const [sessionId, aiContent] = responseData.split(':::');

      // 添加AI回复到store，只使用实际内容部分
      chatStore.addMessage({
        content: aiContent,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        avatar: ''
      });

      // 设置sessionId
      if (sessionId) {
        chatStore.setCurrentSessionId(sessionId);
        await router.push(`/home/${sessionId}`);
      }
    }
  }
  else {
    console.log(12)
    const res = await newMathChatApi(chatStore.currentSessionId, content);
    console.log(res.data.data)
    if (res.data.data) {
      // 添加AI回复到store

      chatStore.addMessage({
        content: res.data.data,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        avatar: ''
      });
    }
  }


  scrollToBottom();
}
</script>

<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="header-title">AI 助手</div>
      <div class="header-actions">
        <el-button size="small">
          <el-icon>
            <Setting/>
          </el-icon>
        </el-button>
      </div>
    </div>

    <div class="message-list" ref="messageListRef">
      <div class="message-list-container">
        <MessageItem
            v-for="(message,index) in messages"
            :key="index"
            :message="message"
        />
      </div>
    </div>

    <MessageInput @send-message="handleSendMessage"/>
  </div>
</template>
<style scoped lang="scss">
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-light);

  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-light);
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
