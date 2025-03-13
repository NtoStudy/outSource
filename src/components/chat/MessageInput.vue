<script setup>
import { ref } from "vue";

const inputContent = ref("");
const emit = defineEmits(["send-message"]);

const sendMessage = () => {
  if (inputContent.value.trim()) {
    emit("send-message", inputContent.value);
    inputContent.value = "";
  }
};

// 添加回车发送功能
const handleKeydown = (e) => {
  if (e.key === "Enter" && e.shiftKey) {
    sendMessage();
    e.preventDefault();
  }
};
</script>

<template>
  <div class="input-container">
    <div class="input-area">
      <div class="input-wrapper">
        <div
          class="input-box"
          contenteditable="true"
          @input="(e) => (inputContent = e.target.innerText)"
          @keydown="handleKeydown"
          placeholder="有问题，尽管问，shift+enter发送"
        ></div>

        <div class="input-actions">
          <el-tooltip content="附件" placement="top">
            <el-button circle class="attachment-button">
              <el-icon>
                <Paperclip />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="发送" placement="top">
            <el-button circle class="send-button" @click="sendMessage">
              <el-icon>
                <Position />
              </el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
}

.input-area {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  padding: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--bg-tertiary); 
  border-radius: 18px;
  border: 1px solid var(--border-light); 
  padding: 8px 16px;
}

.input-box {
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 0;
  padding-right: 100px; /* 为按钮留出空间 */
  background-color: transparent;
  border: none;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);

  &:focus {
    outline: none;
  }

  &:empty:before {
    content: attr(placeholder);
    &:empty:before {
      color: var(--text-secondary);
    font-style: italic;
  }
}

.input-actions {
  position: absolute;
  right: 10px;
  display: flex;
  gap: 8px;
  align-items: center;

  .send-button {
    background-color: var(--primary-color);
    color: var(--text-secondary);
    border: none;
    width: 32px;
    height: 32px;
  }
    &:hover {
      background-color: color.adjust(#4080ff, $lightness: -5%);
    }

    .el-icon {
      font-size: 16px;
    }
  }

  .attachment-button {
    background-color: transparent;
    border: none;
    color: var(--text-secondary);
    width: 32px;
    height: 32px;

    &:hover {
        background-color: var(--hover-bg);
    }

    .el-icon {
      font-size: 16px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .input-area {
    max-width: 100%;
  }
}
</style>
