<script setup>
import {onMounted, ref} from "vue";
import SettingsDialog from '../dialogs/SettingDialogs.vue';
import FeedbackDialog from '../dialogs/FeedbackDialog.vue';
import HistoryList from './HistoryList.vue';
import UserMenu from './UserMenu.vue';
import {useThemeStore} from "@/store/theme.js";
import {mathListApi, newMathChatApi} from "@/api/ai.js";
import router from "@/router/index.js";

const themeStore = useThemeStore()
// 控制弹出框的变量
const popoverVisible = ref(false);
// 控制侧边栏展开状态
const sidebarExpanded = ref(false);
// 控制系统设置对话框显示
const settingsDialogVisible = ref(false);
// 语言选项
const languageOption = ref("跟随系统");
// 主题选项
const themeOption = ref(themeStore.currentTheme);
// 控制用户反馈对话框显示
const feedbackDialogVisible = ref(false);

// 切换侧边栏展开状态
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

// 打开系统设置对话框
const openSettingsDialog = () => {
  settingsDialogVisible.value = true;
  popoverVisible.value = false; // 关闭用户菜单
};

// 打开用户反馈对话框
const openFeedbackDialog = () => {
  feedbackDialogVisible.value = true;
  popoverVisible.value = false; // 关闭用户菜单
};

// 处理用户菜单事件
const handleUserMenuAction = (action) => {
  popoverVisible.value = false;

  if (action === 'settings') {
    openSettingsDialog();
  } else if (action === 'feedback') {
    openFeedbackDialog();
  } else if (action === 'logout') {
    // 处理退出登录
    console.log('退出登录');
  } else if (action === 'delete-all') {
    // 处理删除所有对话
    console.log('删除所有对话');
  }
};

// 处理反馈提交
const handleFeedbackSubmit = (feedback) => {
  console.log('提交反馈:', feedback);
  // 这里可以添加提交反馈的逻辑
};

// 模拟历史记录数据
const historyItems = ref([])

const mathList = async ()=>{
  const res =  await mathListApi()
  if(res.data.code === 1){
    historyItems.value = res.data.data
  }
}


const handleNewChat = async ()=>{
  await router.push('/home/empty');
  if (sidebarExpanded.value) {
    toggleSidebar();
  }
}
onMounted(()=>{
  mathList()
})

</script>

<template>
  <div class="sidebar" :class="{ expanded: sidebarExpanded }">
    <!-- 收起状态下的内容 -->
    <template v-if="!sidebarExpanded">
      <!-- 顶部鲸鱼图标 -->
      <div class="logo-container">
        <div class="logo">
          <el-icon color="#4080ff" :size="28">
            <Ship/>
          </el-icon>
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
            <el-icon>
              <Expand/>
            </el-icon>
          </div>
        </el-tooltip>

        <el-tooltip
            class="box-item"
            effect="dark"
            content="开启新对话"
            placement="right-start"
        >
          <div class="sidebar-item" @click="handleNewChat">
            <el-icon>
              <ChatDotRound/>
            </el-icon>
          </div>
        </el-tooltip>
      </div>

      <!-- 底部图标 -->
      <div class="bottom-items">
        <div class="sidebar-item" @click="openSettingsDialog">
          <el-icon>
            <Setting/>
          </el-icon>
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
              <el-icon>
                <User/>
              </el-icon>
            </div>
          </template>

          <!-- 使用用户菜单组件 -->
          <UserMenu @settings="handleUserMenuAction('settings')"
                    @feedback="handleUserMenuAction('feedback')"
                    @logout="handleUserMenuAction('logout')"
                    @delete-all="handleUserMenuAction('delete-all')"/>
        </el-popover>
      </div>
    </template>

    <!-- 展开状态下的内容 -->
    <template v-else>
      <div class="expanded-header">
        <h2 class="expanded-title">数学一点通</h2>
        <div class="close-icon" @click="toggleSidebar">
          <el-icon>
            <Fold/>
          </el-icon>
        </div>
      </div>

      <!-- 新建对话按钮 -->
      <div class="new-chat-button" @click="handleNewChat">
        <el-icon>
          <ChatRound/>
        </el-icon>
        <span>开启新对话</span>
      </div>

      <!-- 使用历史记录列表组件 -->
      <HistoryList :history-items="historyItems"/>

      <el-popover
          placement="top"
          trigger="click"
          style="width: auto"
          v-model:visible="popoverVisible"
      >
        <template #reference>
          <div class="user-info">
            <img class="user-avatar"></img>
            <span>个人信息</span>
          </div>
        </template>

        <!-- 使用用户菜单组件 -->
        <UserMenu @settings="handleUserMenuAction('settings')"
                  @feedback="handleUserMenuAction('feedback')"
                  @logout="handleUserMenuAction('logout')"
                  @delete-all="handleUserMenuAction('delete-all')"/>
      </el-popover>
    </template>
  </div>

  <!-- 使用设置对话框组件 -->
  <SettingsDialog
      v-model:visible="settingsDialogVisible"
      v-model:language-option="languageOption"
      v-model:theme-option="themeOption"
  />

  <!-- 使用反馈对话框组件 -->
  <FeedbackDialog
      v-model:visible="feedbackDialogVisible"
      @submit="handleFeedbackSubmit"
  />
</template>

<style scoped lang="scss">
.sidebar {
  width: 60px;
  height: 100vh;
  background-color: var(--bg-tertiary);
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
    background-color: var(--bg-secondary); // 修改
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
    border-bottom: 1px solid var(--border-light);

    .expanded-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-icon {
      cursor: pointer;
      font-size: 20px;
      color: var(--text-secondary);
      padding: 8px;
      border-radius: 4px;

      &:hover {
        background-color: var(--hover-bg);
      }
    }
  }

  .new-chat-button {
    margin: 16px;
    padding: 10px 16px;
    background-color: var(--highlight-bg);
    color: var(--highlight-color);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--highlight-hover);
    }

    .el-icon {
      margin-right: 8px;
      font-size: 18px;
    }

    span {
      font-size: 14px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 16px;
    border-top: 1px solid var(--border-light);

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--bg-secondary);
      margin-right: 12px;
    }

    span {
      font-size: 14px;
      color: var(--text-primary);
    }
  }
}
</style>
