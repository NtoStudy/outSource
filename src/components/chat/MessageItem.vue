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

// 清理文本中的所有不可见字符和零宽空格
const cleanText = (text) => {
  if (!text) return '';
  // 移除零宽空格和其他不可见字符
  return text.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
};

// 处理特殊字符转义
const escapeSpecialChars = (text) => {
  // 替换HTML实体
  return text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
};

// 自定义渲染数学公式
const renderMath = (content) => {
  // 清理文本
  content = cleanText(content);

  // 处理HTML实体
  content = escapeSpecialChars(content);

  // 修改正则表达式，使其能够处理括号内的公式
  const inlineMathRegex = /\$(.*?)\$/g;
  const displayMathRegex = /\\\[(.*?)\\\]/g;

  // 处理行间公式 \[ ... \]
  let processedContent = content.replace(displayMathRegex, (match, formula) => {
    formula = cleanText(formula);

    if (/[\u4e00-\u9fa5]/.test(formula)) {
      return match;
    }

    try {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true,
        strict: false,
        trust: true,
        output: 'html'
      });
    } catch (e) {
      console.error('KaTeX 行间公式渲染错误:', e);
      return match;
    }
  });

  // 处理行内公式 $ ... $
  processedContent = processedContent.replace(inlineMathRegex, (match, formula) => {
    formula = cleanText(formula);

    if (/[\u4e00-\u9fa5]/.test(formula)) {
      return match;
    }

    try {
      // 检测是否包含复杂结构，如果包含则使用displayMode
      const isComplexFormula = /\\left|\\right|\\frac|\\sqrt|\\sum|\\binom/.test(formula);

      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: isComplexFormula,
        strict: false,
        trust: true,
        output: 'html',
        macros: {
          // 添加常用宏定义
          "\\R": "\\mathbb{R}",
          "\\N": "\\mathbb{N}",
          "\\Z": "\\mathbb{Z}"
        }
      });
    } catch (e) {
      console.error('KaTeX 行内公式渲染错误:', e);
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

  // 清理文本
  processedContent = cleanText(processedContent);

  // 处理HTML实体
  processedContent = escapeSpecialChars(processedContent);

  processedContent = processedContent.replace(/\\\((.*?)\\\)/g, (match, formula) => {
    if (/[\u4e00-\u9fa5]/.test(formula)) {
      return match;
    }
    return `$${formula}$`;
  });

  // 处理方括号格式的公式
  processedContent = processedContent.replace(/\[(.*?)\]/g, (match, formula) => {
    // 检查公式中是否包含中文字符
    if (/[\u4e00-\u9fa5]/.test(formula)) {
      return match; // 如果包含中文，不进行渲染
    }
    return `$${formula}$`;
  });

  // 先渲染Markdown，再渲染数学公式
  const renderedMarkdown = md.render(processedContent);
  return renderMath(renderedMarkdown);
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
