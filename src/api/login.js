import instance from "@/api/index.js";

/**
 * 注册API
 * 该函数通过POST请求向服务器发送用户注册信息，包括用户名、密码、邮箱和验证码
 * @param {Object} userData - 包含用户注册信息的对象
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @param {string} userData.email - 邮箱
 * @param {string} userData.code - 验证码
 * @returns {Promise} - 返回一个Promise对象，表示异步操作
 */
export const registerApi = ({username, password, email, code}) => instance({
  url: '/user/register',
  method: 'post',
  params: {
    username,
    password,
    email,
    code
  }
})

/**
 * 发送验证码API
 * 该函数通过POST请求向指定邮箱发送验证码，用于用户注册或找回密码时的身份验证
 * @param {string} email - 需要发送验证码的邮箱地址
 * @returns {Promise} - 返回一个Promise对象，表示异步操作
 */
export const sendCodeApi = (email) => instance({
  url: '/user/sendCode',
  method: 'post',
  params: {
    email
  }
})

/**
 * 登录API
 * 该函数通过POST请求向服务器发送用户登录信息，包括用户名和密码
 * @param {Object} loginData - 包含用户登录信息的对象
 * @param {string} loginData.username - 用户名
 * @param {string} loginData.password - 密码
 * @returns {Promise} - 返回一个Promise对象，表示异步操作
 */
export const loginApi = ({username, password}) => instance({
  url: '/user/login',
  method: 'post',
  params: {
    username,
    password
  }
})
