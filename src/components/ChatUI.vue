<script setup>
import {ref} from "vue";
import ChatInput from "@/components/ChatInput.vue";

const messages = ref([
  {
    id: 'user',
    content: "你好",
    messageType: "text",
    sentTime: "2023-06-01 12:00:00",
    showTimestamp: true
  }, {
    id: 'ai',
    content: "你好",
    messageType: "text",
    sentTime: "2023-06-01 12:00:00",
    showTimestamp: true
  }, {
    id: 'ai',
    content: "你好",
    messageType: "text",
    sentTime: "2023-06-01 12:00:00",
    showTimestamp: true
  }, {
    id: 'ai',
    content: "你好",
    messageType: "text",
    sentTime: "2023-06-01 12:00:00",
    showTimestamp: true
  }, {
    id: 'ai',
    content: "你好",
    messageType: "text",
    sentTime: "2023-06-01 12:00:00",
    showTimestamp: true
  }, {
    id: 'ai',
    content: "你好",
    messageType: ""
  }, {
    id: 'ai',
    content: "你好",
    messageType: ""
  }, {
    id: 'ai',
    content: "你好",
    messageType: ""
  }, {
    id: 'user',
    content: "你好",
    messageType: ""
  }, {
    id: 'user',
    content: "你好",
    messageType: ""
  }, {
    id: 'user',
    content: "你好",
    messageType: ""
  }
]);
</script>

<template>
  <div class="chat-window">
    <div class="messages">
      <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', 'user-message']"
      >
        <div v-if="message.showTimestamp" class="timestamp">{{ message.sentTime }}</div>
        <div class="user-content" v-if="message.id === 'user'">
          <div class="text">{{ message.content }}</div>
          <div class="avatar">我</div>
        </div>
        <div class="assistant-content">
          <div class="avatar">AI</div>
          <div class="text">{{ message.content }}</div>
        </div>
      </div>
    </div>
    <ChatInput/>
  </div>
</template>

<style lang="scss" scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
  align-items: center;

  .messages {
    overflow-y: auto;
    width: 60%;
    height: 78%;




    .message {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;

      .timestamp {
        font-size: 12px;
        color: #999999;
        margin-bottom: 5px;
      }

      .user-content {
        display: flex;
        align-items: flex-end;
        margin-left: auto;
      }

      .assistant-content {
        display: flex;
        align-items: flex-start;
        margin-right: auto;
      }

      .avatar {
        width: 40px;
        height: 40px;
        background-color: #e0e0e0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: #666666;
      }

      .text {
        padding: 10px;
        border-radius: 5px;
        margin: 0 10px;
        word-wrap: break-word;
      }

      &.user-message .text {
        background-color: #007bff;
        color: white;
      }

      &.assistant-message .text {
        background-color: #f0f0f0;
        color: #333333;
      }
    }
  }

}
</style>
