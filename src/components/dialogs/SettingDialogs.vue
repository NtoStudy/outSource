<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  languageOption: {
    type: String,
    default: '跟随系统'
  },
  themeOption: {
    type: String,
    default: '浅色'
  }
});

const emit = defineEmits(['update:visible', 'update:languageOption', 'update:themeOption']);

// 当前选中的设置标签页
const activeSettingsTab = ref('通用设置');

// 关闭对话框
const closeDialog = () => {
  emit('update:visible', false);
};

// 更新语言选项
const updateLanguage = (value) => {
  emit('update:languageOption', value);
};

// 更新主题选项
const updateTheme = (value) => {
  emit('update:themeOption', value);
};
</script>

<template>
  <el-dialog
    :modelValue="visible"
    @update:modelValue="(val) => emit('update:visible', val)"
    title="系统设置"
    width="500px"
    :show-close="true"
    class="settings-dialog"
  >
    <div class="settings-container">
      <!-- 设置标签页 -->
      <div class="settings-tabs">
        <div
          class="settings-tab"
          :class="{ active: activeSettingsTab === '通用设置' }"
          @click="activeSettingsTab = '通用设置'"
        >
          通用设置
        </div>
        <div
          class="settings-tab"
          :class="{ active: activeSettingsTab === '账户信息' }"
          @click="activeSettingsTab = '账户信息'"
        >
          账户信息
        </div>
      </div>

      <!-- 设置内容 -->
      <div class="settings-content">
        <!-- 通用设置 -->
        <div v-if="activeSettingsTab === '通用设置'" class="settings-section">
          <div class="settings-item">
            <div class="settings-label">语言</div>
            <el-select 
              :modelValue="languageOption" 
              @update:modelValue="updateLanguage" 
              class="settings-select"
            >
              <el-option label="跟随系统" value="跟随系统" />
              <el-option label="简体中文" value="简体中文" />
              <el-option label="English" value="English" />
            </el-select>
          </div>

          <div class="settings-item">
            <div class="settings-label">主题</div>
            <el-select 
              :modelValue="themeOption" 
              @update:modelValue="updateTheme" 
              class="settings-select"
            >
              <el-option label="深色" value="深色" />
              <el-option label="浅色" value="浅色" />
            </el-select>
          </div>
        </div>

        <!-- 账户信息 -->
        <div v-if="activeSettingsTab === '账户信息'" class="settings-section">
          <div class="account-info">
            <div class="account-item">
              <div class="account-label">手机号</div>
              <div class="account-value">195****3747</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.settings-dialog {
  :deep(.el-dialog__header) {
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }

  :deep(.el-dialog__body) {
    padding: 0;
  }

  :deep(.el-dialog__headerbtn) {
    top: 20px;
  }
}

.settings-container {
  display: flex;
  height: 400px;
}

.settings-tabs {
  width: 120px;
  background-color: #f5f5f5;
  height: 100%;
  border-right: 1px solid #eee;
}

.settings-tab {
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  
  &.active {
    background-color: #fff;
    color: var(--primary-color);
    font-weight: 500;
  }
  
  &:hover:not(.active) {
    background-color: #eee;
  }
}

.settings-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-label {
  font-size: 14px;
  color: #333;
}

.settings-select {
  width: 200px;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.account-label {
  font-size: 14px;
  color: #666;
}

.account-value {
  font-size: 14px;
  color: #333;
}
</style>