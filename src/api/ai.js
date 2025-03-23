import instance from "@/api/index.js";

/**
 * 每次点击就是一个新的对话
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const newMathChatApi = (sessionId = "", message) => instance({
  url: '/math/chat',
  method: 'post',
  params: {
    sessionId,
    message
  }
})

/**
 * 列举出某一个用户的所有会话
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathListApi = () => instance({
  url: '/math/list',
  method: 'get'
})

/**
 * 某一个会话的历史记录
 * @param {string} sessionId - 会话ID
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathMessageApi = (sessionId) => instance({
  url: '/math/message',
  method: 'get',
  params: {
    sessionId
  }
})

