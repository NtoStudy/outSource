<script setup>
import { ref } from 'vue';

const inputContent = ref('');
const emit = defineEmits(['send-message']);

const sendMessage = () => {
  if (inputContent.value.trim()) {
    emit('send-message', inputContent.value);
    inputContent.value = '';
  }
};

// 添加回车发送功能
const handleKeydown = (e) => {
  if (e.key === 'Enter' && e.shiftKey) {
    sendMessage();
    e.preventDefault();
  }
};
</script>

<template>
  <div class="input-container">
    <div class="input-area">
      <div
          class="input-box"
          contenteditable="true"
          @input="e => inputContent = e.target.innerText"
          @keydown="handleKeydown"
          placeholder="有问题，尽管问，shift+enter发送"
      ></div>

      <div class="input-actions">
        <div class="left-actions">
          <div class="action-button">
            <el-tooltip content="搜索" placement="top">
              <div class="custom-button">
                <span class="button-text">DeepSeek</span>
              </div>
            </el-tooltip>
          </div>

          <div class="action-button">
            <el-tooltip content="表情" placement="top">
              <div class="custom-button">
                <el-icon><ChatDotRound /></el-icon>
                <span class="button-text">深度思考(R1)</span>
              </div>
            </el-tooltip>
          </div>

          <div class="action-button">
            <el-tooltip content="网络搜索" placement="top">
              <div class="custom-button">
                <el-icon><Search /></el-icon>
                <span class="button-text">联网搜索</span>
              </div>
            </el-tooltip>
          </div>
        </div>

        <div class="right-actions">
          <el-tooltip content="发送" placement="top">
            <el-button circle class="send-button">
              <el-icon><Position /></el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip content="附件" placement="top">
            <el-button circle class="attachment-button">
              <el-icon><Paperclip /></el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip content="更多" placement="top">
            <el-button circle class="more-button">
              <el-icon><MoreFilled /></el-icon>
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
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;

  .input-box {
    width: 100%;
    min-height: 60px;
    max-height: 200px;
    padding: 12px 16px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background-color: #f9f9f9;
    overflow-y: auto;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background-color: #fff;
      box-shadow: 0 0 0 2px rgba(64, 128, 255, 0.1);
    }

    &:empty:before {
      content: attr(placeholder);
      color: #999;
      font-style: italic;
    }
  }

  .input-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding: 0 8px;

    .left-actions, .right-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .custom-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 16px;
      background-color: #f5f5f5;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e8e8e8;
      }

      .el-icon {
        font-size: 16px;
        color: #666;
      }

      .button-text {
        font-size: 13px;
        color: #666;
      }
    }

    .send-button {
      background-color: var(--primary-color);
      color: white;
      border: none;

      &:hover {
        background-color: color.adjust(#4080ff, $lightness: -5%);
      }
    }

    .attachment-button, .more-button {
      background-color: #f9f9f9;
      border: none;
      color: #666;

      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .input-area {
    max-width: 100%;
  }

  .input-actions {
    flex-direction: column;
    gap: 10px;

    .left-actions {
      overflow-x: auto;
      padding-bottom: 5px;
    }
  }
}
</style>
