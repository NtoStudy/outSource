<script setup>
import { reactive, ref, defineEmits } from 'vue';

const emit = defineEmits(['register', 'send-code']);

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

// 注册处理
const handleRegister = () => {
  emit('register', registerForm);
};

// 发送验证码
const sendVerificationCode = () => {
  if (!registerForm.email) {
    return;
  }

  emit('send-code', registerForm.email);

  // 开始倒计时
  isSendingCode.value = true;
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isSendingCode.value = false;
    }
  }, 1000);
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleRegister">
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
            v-model="registerForm.code"
            placeholder="请输入验证码"
        />
        <el-button
            type="primary"
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
        native-type="submit"
    >
      注册
    </el-button>
  </form>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: var(--text-primary);
    font-weight: 500;
  }
}

.verification-row {
  .verification-input {
    display: flex;
    gap: 8px;

    .el-input {
      flex: 1;
    }

    .el-button {
      width: 100px;
      font-size: 12px;
    }
  }
}

.submit-btn {
  margin-top: 8px;
  height: 36px;
  font-size: 15px;
}

:deep(.el-input__wrapper) {
  padding: 0 11px;
}

:deep(.el-input__inner) {
  height: 36px;
}
</style>
