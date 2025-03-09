<script setup>
import { ref } from "vue";

// 控制弹出框的变量
const popoverVisible = ref(false);
// 控制侧边栏展开状态
const sidebarExpanded = ref(false);

// 切换侧边栏展开状态
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

// 模拟历史记录数据
const historyItems = [
  {
    id: 1,
    title: "昨天",
    items: [{ id: 101, content: "消除Element Plus popover默认样式" }],
  },
  {
    id: 2,
    title: "7 天内",
    items: [
      { id: 201, content: "C语言表达式求值结果分析" },
      { id: 202, content: "PPT个人介绍页设计指令总结" },
      { id: 203, content: "新对话" },
      { id: 204, content: "构建比赛前端页面的专业建议" },
      { id: 205, content: "Vue组件拆分与父组件代码提供" },
    ],
  },
  {
    id: 3,
    title: "30 天内",
    items: [{ id: 301, content: "WebSocket消息发送问题排查与解决方案" }],
  },
];
</script>

<template>
  <div class="sidebar" :class="{ expanded: sidebarExpanded }">
    <!-- 收起状态下的内容 -->
    <template v-if="!sidebarExpanded">
      <!-- 顶部鲸鱼图标 -->
      <div class="logo-container">
        <div class="logo">
          <el-icon color="#4080ff" :size="28"><Ship /></el-icon>
        </div>
      </div>

      <!-- 中间导航图标 -->
      <div class="nav-items">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="打开侧边栏"
          placement="right-start"
        >
          <div
            class="sidebar-item"
            :class="{ active: sidebarExpanded }"
            @click="toggleSidebar"
          >
            <el-icon><Expand /></el-icon>
          </div>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="开启新对话"
          placement="right-start"
        >
          <div class="sidebar-item">
            <el-icon><ChatDotRound /></el-icon>
          </div>
        </el-tooltip>
      </div>

      <!-- 底部图标 -->
      <div class="bottom-items">
        <div class="sidebar-item">
          <el-icon><Setting /></el-icon>
        </div>

        <!-- 用户图标添加弹出菜单 -->
        <el-popover
          placement="right"
          trigger="click"
          style="width: auto"
          v-model:visible="popoverVisible"
        >
          <template #reference>
            <div class="sidebar-item">
              <el-icon><User /></el-icon>
            </div>
          </template>

          <!-- 弹出菜单内容 -->
          <div class="popover-content">
            <div class="menu-item">
              <el-icon><Iphone /></el-icon>
              <span>195****3747</span>
            </div>

            <div class="menu-item">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </div>

            <div class="menu-item">
              <el-icon><Delete /></el-icon>
              <span>删除所有对话</span>
            </div>

            <div class="menu-item">
              <el-icon><Message /></el-icon>
              <span>联系我们</span>
            </div>

            <div class="menu-item">
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </div>
          </div>
        </el-popover>
      </div>
    </template>

    <!-- 展开状态下的内容 -->
    <template v-else>
      <div class="expanded-header">
        <h2 class="expanded-title">数学一点通</h2>
        <div class="close-icon" @click="toggleSidebar">
          <el-icon><Fold /></el-icon>
        </div>
      </div>

      <!-- 新建对话按钮 -->
      <div class="new-chat-button">
        <el-icon><ChatRound /></el-icon>
        <span>开启新对话</span>
      </div>

      <!-- 历史记录列表 -->
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

      <el-popover
        placement="top"
        trigger="click"
        style="width: auto"
        v-model:visible="popoverVisible"
      >
        <template #reference>
          <div class="user-info">
            <div class="user-avatar"></div>
            <span>个人信息</span>
          </div>
        </template>

        <!-- 弹出菜单内容 -->
        <div class="popover-content">
          <div class="menu-item">
            <el-icon><Iphone /></el-icon>
            <span>195****3747</span>
          </div>

          <div class="menu-item">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </div>

          <div class="menu-item">
            <el-icon><Delete /></el-icon>
            <span>删除所有对话</span>
          </div>

          <div class="menu-item">
            <el-icon><Message /></el-icon>
            <span>联系我们</span>
          </div>

          <div class="menu-item">
            <el-icon><SwitchButton /></el-icon>
            <span>退出登录</span>
          </div>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 60px;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  transition: width 0.3s ease;
  overflow: hidden;

  &.expanded {
    width: 260px;
    align-items: stretch;
    background-color: #f9fafb;
    padding: 0;
  }

  .logo-container {
    margin-bottom: 30px;
    .logo {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  .bottom-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
  }

  .sidebar-item {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    cursor: pointer;
    color: var(--light-text);

    &:hover,
    &.active {
      background-color: var(--hover-color);
      color: var(--primary-color);
    }
  }

  /* 展开状态下的样式 */
  .expanded-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;

    .expanded-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .close-icon {
      cursor: pointer;
      font-size: 20px;
      color: #666;
      padding: 8px;
      border-radius: 4px;

      &:hover {
        background-color: #eee;
      }
    }
  }

  .new-chat-button {
    margin: 16px;
    padding: 10px 16px;
    background-color: #e6efff;
    color: #4080ff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #d9e6ff;
    }

    .el-icon {
      margin-right: 8px;
      font-size: 18px;
    }

    span {
      font-size: 14px;
    }
  }

  .history-container {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;

    .history-group {
      margin-bottom: 20px;

      .history-group-title {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
        padding-left: 4px;
      }

      .history-item {
        padding: 10px 12px;
        border-radius: 6px;
        cursor: pointer;
        margin-bottom: 4px;
        font-size: 14px;
        color: #333;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  .download-app {
    margin: 16px;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .el-icon {
      margin-right: 8px;
      font-size: 18px;
      color: #666;
    }

    span {
      font-size: 14px;
      color: #333;
    }

    .new-tag {
      margin-left: auto;
      background-color: #4080ff;
      color: white;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 10px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 16px;
    border-top: 1px solid #eee;

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ddd;
      margin-right: 12px;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }
}

.popover-content {
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    .el-icon {
      margin-right: 10px;
      font-size: 18px;
      color: #666;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
