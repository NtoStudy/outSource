<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible", "submit"]);

// 用户反馈评分
const feedbackRating = ref(5);
// 反馈内容
const feedbackContent = ref("");

// 提交反馈
const submitFeedback = () => {
  emit("submit", {
    rating: feedbackRating.value,
    content: feedbackContent.value,
  });
  feedbackContent.value = "";
  emit("update:visible", false);
};
</script>

<template>
  <el-dialog
    :modelValue="visible"
    @update:modelValue="(val) => emit('update:visible', val)"
    title="用户反馈"
    width="500px"
    :show-close="true"
    class="feedback-dialog"
  >
    <div class="feedback-container">
      <h3 class="feedback-title">你和 Kimi 的对话还愉快吗？</h3>

      <div class="rating-container">
        <el-rate
          v-model="feedbackRating"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          :texts="['很差', '较差', '一般', '不错', '很好']"
          show-text
          class="custom-rate"
        />
      </div>

      <div class="feedback-input">
        <p class="feedback-tip">
          如果你愿意的话，欢迎说说你的想法，Kimi 会努力做更好！
        </p>
        <el-input
          v-model="feedbackContent"
          type="textarea"
          :rows="4"
          resize="none"
          placeholder="欢迎说说你的想法"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('update:visible', false)">以后再说</el-button>
        <el-button type="primary" @click="submitFeedback">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.feedback-dialog {
  :deep(.el-dialog__header) {
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid var(--border-light);
  }

  :deep(.el-dialog__body) {
    padding: 20px;
  }

  :deep(.el-dialog__footer) {
    padding: 20px;
    border-top: 1px solid var(--border-light);
  }
}

.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.feedback-title {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 30px;
  text-align: center;
}

.rating-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.custom-rate {
  :deep(.el-rate__icon) {
    font-size: 28px;
    margin-right: 10px;
  }

  :deep(.el-rate__text) {
    font-size: 14px;
    color: var(--text-secondary);
    margin-left: 10px;
  }
}

.feedback-input {
  width: 100%;

  .feedback-tip {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
