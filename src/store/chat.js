import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 存储当前会话的消息列表
  const messages = ref([])

  // 当前会话ID
  const currentSessionId = ref('')

  // 设置消息列表
  const setMessages = (newMessages) => {
    messages.value = newMessages
  }

  // 添加单条消息
  const addMessage = (message) => {
    messages.value.push(message)
  }

  // 设置当前会话ID
  const setCurrentSessionId = (sessionId) => {
    currentSessionId.value = sessionId
  }

  // 清空消息
  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    currentSessionId,
    setMessages,
    addMessage,
    setCurrentSessionId,
    clearMessages
  }
}, {
  persist: {
    key: 'chat-store',
    storage: localStorage,
    paths: ['currentSessionId']
  }
})
