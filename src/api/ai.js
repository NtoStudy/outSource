import instance from "@/api/index.js";

/**
 * 新增数学聊天API
 * @param {string} sessionId - 会话ID
 * @param {string} message - 用户发送的消息
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const newMathChatApi = (sessionId, message) => instance({
  url: '/math/chat',
  method: 'post',
  params: {
    sessionId,
    message
  }
})

/**
 * 数学列表API
 * 用于获取数学相关问题列表
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathListApi = () => instance({
  url: '/math/list',
  method: 'get'
})

/**
 * 数学消息API
 * 用于获取特定会话ID的数学消息
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

/**
 * 数学聊天API
 * 用于发送用户消息并获取回复
 * @param {string} sessionId - 会话ID
 * @param {string} message - 用户发送的消息
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathChatApi = (sessionId, message) => instance({
  url: '/math/chat',
  method: 'post',
  params: {
    sessionId,
    message
  }
})

/**
 * 按会话ID查询数学聊天记录API
 * 用于发送用户消息并获取回复
 * @param {string} sessionId - 会话ID
 * @param {string} message - 用户发送的消息
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathChatbysessionnidApi = (sessionId, message) => instance({
  url: '/math/chatbysessionnid',
  method: 'post',
  params: {
    sessionId,
    message
  }
})

/**
 * 按消息查询数学聊天记录API
 * 用于发送用户消息并获取回复
 * @param {string} sessionId - 会话ID
 * @param {string} message - 用户发送的消息
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathChatbymessageApi = (sessionId,message)=>instance({
  url:'/math/chatbymessage',
  method:'post',
  params:{
    sessionId,
    message
  }
})

/**
 * 数学相关问题API
 * 用于获取与特定问题相关的数学问题
 * @param {string} question - 数学问题
 * @returns {Promise} - 包含服务器响应的Promise对象
 */
export const mathRelatedquestionsApi = (question)=>instance({
  url:'/math/related_questions',
  method:'post',
  params:{
    question
  }
})
