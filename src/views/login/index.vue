<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessage} from "element-plus";
import {loginApi, registerApi} from "@/api/login.js";

const router = useRouter();

// 当前活动标签（登录/注册）
const activeTab = ref('login');

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
});

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  code: ''
});

// 验证码相关
const countdown = ref(0);
const isSendingCode = ref(false);

// 登录处理
const handleLogin = async () => {
  try {
    // 这里添加登录接口调用
    console.log('登录信息:', loginForm);
    const res = await loginApi({loginForm})

    // 登录成功后跳转到首页
    router.push('/');
  } catch (error) {
    console.error('登录失败:', error);
  }
};

// 注册处理
const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  const res = await registerApi({registerForm})
  console.log(res)
  // 注册成功后切换到登录标签
  activeTab.value = 'login';
  ElMessage.success('注册成功，请登录');

};

// 发送验证码
const sendVerificationCode = async () => {
  if (!registerForm.email) {
    ElMessage.error('请输入邮箱地址');
    return;
  }

  try {
    isSendingCode.value = true;


    // 开始倒计时
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        isSendingCode.value = false;
      }
    }, 1000);

    ElMessage.success('验证码已发送');
  } catch (error) {
    console.error('发送验证码失败:', error);
    isSendingCode.value = false;
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
      <div v-if="activeTab === 'login'" class="login-form">
        <div class="form-item">
          <label>用户名</label>
          <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
          />
        </div>

        <div class="form-item">
          <label>密码</label>
          <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
          />
        </div>

        <div class="form-item remember-row">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <a href="#" class="forgot-link">忘记密码?</a>
        </div>

        <el-button
            type="primary"
            class="submit-btn"
            @click="handleLogin"
        >
          登录
        </el-button>
      </div>

      <!-- 注册表单 -->
      <div v-if="activeTab === 'register'" class="login-form">
        <div class="form-item">
          <label>用户名</label>
          <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
          />
        </div>

        <div class="form-item">
          <label>邮箱</label>
          <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱"
              prefix-icon="Message"
          />
        </div>

        <div class="form-item verification-row">
          <label>验证码</label>
          <div class="verification-input">
            <el-input
                v-model="registerForm.verificationCode"
                placeholder="请输入验证码"
            />
            <el-button
                :disabled="countdown > 0 || isSendingCode"
                @click="sendVerificationCode"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </div>

        <div class="form-item">
          <label>密码</label>
          <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
          />
        </div>

        <div class="form-item">
          <label>确认密码</label>
          <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              prefix-icon="Lock"
              show-password
          />
        </div>

        <el-button
            type="primary"
            class="submit-btn"
            @click="handleRegister"
        >
          注册
        </el-button>
      </div>
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
  width: 380px; // 减小卡片宽度
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px; // 减小内边距
}

.login-header {
  text-align: center;
  margin-bottom: 20px; // 减小底部间距

  h2 {
    font-size: 22px; // 减小字体大小
    color: var(--text-primary);
    margin-bottom: 6px; // 减小底部间距
    font-weight: 600;
  }

  p {
    font-size: 13px; // 减小字体大小
    color: var(--text-secondary);
    margin: 0;
  }
}

.login-tabs {
  display: flex;
  margin-bottom: 20px; // 减小底部间距
  border-bottom: 1px solid var(--border-light);
}

.login-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0; // 减小内边距
  font-size: 15px; // 减小字体大小
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px; // 减小表单项间距
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px; // 减小标签和输入框间距

  label {
    font-size: 13px; // 减小字体大小
    color: var(--text-primary);
    font-weight: 500;
  }
}

.remember-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  font-size: 13px; // 减小字体大小
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.verification-row {
  .verification-input {
    display: flex;
    gap: 8px; // 减小间距

    .el-input {
      flex: 1;
    }

    .el-button {
      width: 100px; // 减小按钮宽度
      font-size: 12px; // 减小字体大小
    }
  }
}

.submit-btn {
  margin-top: 8px; // 减小顶部间距
  height: 36px; // 减小按钮高度
  font-size: 15px; // 减小字体大小
}

// 为输入框添加紧凑样式
:deep(.el-input__wrapper) {
  padding: 0 11px;
}

:deep(.el-input__inner) {
  height: 36px; // 减小输入框高度
}

:deep(.el-checkbox__label) {
  font-size: 13px; // 减小复选框文字大小
}
</style>
