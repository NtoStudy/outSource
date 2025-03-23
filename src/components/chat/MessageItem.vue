<script setup>
import {defineProps} from 'vue';
import MarkdownIt from 'markdown-it';
import UserAvatar from './UserAvatar.vue';
import katex from 'katex';
// 只引入一次KaTeX样式
import 'katex/dist/katex.min.css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// 自定义渲染数学公式
// 自定义渲染数学公式
const renderMath = (content) => {
  // 修改正则表达式，使其能够处理括号内的公式
  const inlineMathRegex = /\$(.*?)\$/g;

  // 先处理已经被$包围的公式
  let processedContent = content.replace(inlineMathRegex, (match, formula) => {
    try {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: false
      });
    } catch (e) {
      console.error('KaTeX 渲染错误:', e);
      return match;
    }
  });

  // 再处理被括号包围但没有$符号的公式
  const bracketFormulaRegex = /\((.*?\^.*?)\)/g;
  processedContent = processedContent.replace(bracketFormulaRegex, (match, formula) => {
    // 检查公式是否已经被渲染过（是否包含katex的HTML）
    if (match.includes('katex')) {
      return match;
    }

    // 如果没有被渲染，尝试渲染它
    try {
      return '(' + katex.renderToString(formula, {
        throwOnError: false,
        displayMode: false
      }) + ')';
    } catch (e) {
      console.error('括号内公式渲染错误:', e);
      return match;
    }
  });

  return processedContent;
};

const renderContent = (content) => {
  if (content === undefined || content === null) {
    return '';
  }

  // 处理数学公式
  let processedContent = String(content);

  // 处理方括号格式的公式
  processedContent = processedContent.replace(/\[(.*?)\]/g, '$$$1$$');

  // 处理括号内的公式，将(a^2 + b^2 = c^2)转换为$(a^2 + b^2 = c^2)$
  processedContent = processedContent.replace(/\((([a-z0-9]+\^[0-9]+.*?=.*?[a-z0-9]+)|([a-z0-9]+.*?=.*?[a-z0-9]+\^[0-9]+))\)/gi, '($$$1$$)');

  // 先渲染Markdown，再渲染数学公式
  return renderMath(md.render(processedContent));
};
defineProps({
  message: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div class="message-item"
       :class="{ 'ai-message': message.sender === 'ai', 'user-message': message.sender === 'user' }">
    <UserAvatar :src="message.avatar" :type="message.sender"/>

    <div class="message-wrapper">
      <div class="message-content" v-if="message.sender === 'user'">
        {{ message.content }}
      </div>
      <div class="message-content markdown-body" v-else v-html="renderContent(message.content)"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 消息项容器
.message-item {
  display: flex;
  margin-bottom: 20px;
  width: 100%;

  // 用户消息样式
  &.user-message {
    flex-direction: row-reverse;

    .message-wrapper {
      margin-left: 0;
      margin-right: 10px;
      align-items: flex-end;
    }

    .message-content {
      background-color: var(--bg-secondary);
      margin-left: auto;
    }
  }

  // AI消息样式
  &.ai-message {
    .message-content {
      background-color: var(--bg-secondary);
    }
  }
}

// 消息包装器
.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  max-width: 60%;
}

// 消息内容 - 合并重复的样式定义
.message-content {
  padding: 12px 16px;
  border-radius: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  display: inline-block;
  max-width: 100%;

  // KaTeX相关样式
  :deep(.katex) {
    font-size: 1.1em;
    line-height: 1.5;
    display: inline-block !important;
  }

  :deep(.katex-display) {
    overflow-x: auto;
    max-width: 100%;
    padding: 5px 0;
    display: block !important;
  }

  // 修复上标问题
  :deep(.katex .msupsub) {
    text-align: left;
  }

  :deep(.katex .mord.mtight) {
    vertical-align: 0.25em;
  }

  // 修复根号大小问题
  :deep(.katex .sqrt) {
    transform: scale(0.9);
    display: inline-block;
  }

  :deep(.katex .sqrt>.root) {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }

  // Markdown样式
  :deep(p) {
    margin: 0.5em 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(code) {
    background-color: var(--code-bg);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  :deep(pre) {
    background-color: var(--code-block-bg);
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
    }
  }
}

// 消息操作按钮
.message-actions {
  display: flex;
  gap: 15px;
  margin-top: 5px;

  .action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--light-text);
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }

    .el-icon {
      font-size: 14px;
    }
  }
}
</style>
