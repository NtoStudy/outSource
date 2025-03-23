<script setup>
import {defineProps} from 'vue';
import {mathMessageApi} from "@/api/ai.js";
import { useRouter } from 'vue-router';
import { useChatStore } from '@/store/chat.js';

const router = useRouter();
const chatStore = useChatStore();

defineProps({
  historyItems: {
    type: Array,
    default: () => []
  }
});


const handleChatItem = async (group) => {
  const res = await mathMessageApi(group.sessionid);
  console.log(res.data.data);

  if (res.data.data && res.data.data.length > 0) {
    // 获取会话ID
    const chatSessionId = res.data.data[0].sessionId;

    // 将消息数据转换为MessageItem组件需要的格式
    const formattedMessages = res.data.data.map(item => [
      {
        content: item.usermessage,
        sender: 'user',
        timestamp: new Date().toISOString(),
        avatar: ''
      },
      {
        content: item.aimessage,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        avatar: ''
      }
    ]).flat();

    // 更新Pinia store
    chatStore.setCurrentSessionId(chatSessionId);
    chatStore.setMessages(formattedMessages);

    // 导航到对应的路由
    await router.push(`/home/${chatSessionId}`);
  }

}
</script>

<template>
  <div class="history-container">
    <div
        v-for="(group,index) in historyItems"
        :key="index"
        class="history-group"
    >
      <div class="history-item" @click="handleChatItem(group)">
        <span>{{ group.usermessage.length > 15 ? group.usermessage.slice(0, 15) + '...' : group.usermessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.history-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;

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

  .history-group {
    margin-bottom: 20px;


    .history-group-title {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 8px;
      padding-left: 4px;
    }

    .history-item {
      padding: 10px 12px;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 4px;
      font-size: 14px;
      color: var(--text-primary);

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}
</style>
