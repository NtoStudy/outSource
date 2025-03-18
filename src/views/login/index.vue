<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessage} from "element-plus";
import {loginApi, registerApi} from "@/api/login.js";
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';
import {useUserInfoStore} from "@/store/user.js";
const userInfoStore = useUserInfoStore()

const router = useRouter();

// 当前活动标签（登录/注册）
const activeTab = ref('login');

// 登录处理
const handleLogin = async (loginForm) => {
  try {
    // 这里添加登录接口调用
    const res = await loginApi(loginForm);
    if(res.data.code === 1){
      // 确保这里正确保存了 token
      userInfoStore.setToken(res.data.data)
      console.log('保存的token:', res.data.data) // 添加日志确认 token 值
      await router.push('/');
    } else {
      ElMessage.error(res.data.msg || '登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error);
    ElMessage.error('登录失败，请稍后重试')
  }
};

// 注册处理
const handleRegister = async (registerForm) => {
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  const res = await registerApi(registerForm);
  console.log(res.data);
  // 注册成功后切换到登录标签
  activeTab.value = 'login';
  ElMessage.success('注册成功，请登录');
};

// 发送验证码
const sendVerificationCode = async (email) => {
  if (!email) {
    ElMessage.error('请输入邮箱地址');
    return;
  }

  try {
    // 这里添加发送验证码接口调用
    ElMessage.success('验证码已发送');
  } catch (error) {
    console.error('发送验证码失败:', error);
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>欢迎使用</h2>
        <p>请登录您的账号以继续</p>
      </div>

      <div class="login-tabs">
        <div
            class="login-tab"
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
        >
          登录
        </div>
        <div
            class="login-tab"
            :class="{ active: activeTab === 'register' }"
            @click="activeTab = 'register'"
        >
          注册
        </div>
      </div>

      <!-- 登录表单 -->
      <LoginForm
          v-if="activeTab === 'login'"
          @login="handleLogin"
      />

      <!-- 注册表单 -->
      <RegisterForm
          v-if="activeTab === 'register'"
          @register="handleRegister"
          @send-code="sendVerificationCode"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.login-card {
  width: 380px;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
    color: var(--text-primary);
    margin-bottom: 6px;
    font-weight: 600;
  }

  p {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
  }
}

.login-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}

.login-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 15px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    color: var(--primary-color);
    font-weight: 500;
    border-bottom: 2px solid var(--primary-color);
  }

  &:hover:not(.active) {
    color: var(--primary-color);
  }
}
</style>
