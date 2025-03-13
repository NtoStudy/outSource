<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  historyItems: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="history-container">
    <div
        v-for="group in historyItems"
        :key="group.id"
        class="history-group"
    >
      <div class="history-group-title">{{ group.title }}</div>
      <div v-for="item in group.items" :key="item.id" class="history-item">
        <span>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.history-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-light);
    border-radius: 3px;
  }

  .history-group {
    margin-bottom: 20px;


    .history-group-title {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 8px;
      padding-left: 4px;
    }

    .history-item {
      padding: 10px 12px;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 4px;
      font-size: 14px;
      color: var(--text-primary);

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}
</style>
