<script setup>
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['login']);

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
});

// 登录处理
const handleLogin = () => {
  emit('login', loginForm);
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
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
        native-type="submit"
    >
      登录
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

.remember-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  font-size: 13px;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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

:deep(.el-checkbox__label) {
  font-size: 13px;
}
</style>
