<template>
  <div class="slider-container">
    <div class="slider-logo">
      <img src="#">
    </div>
    <div class="slider-content">
      <div class="slider-content-item">

        <el-tooltip
            effect="dark"
            content="打开侧边栏"
            placement="right-end"
        >
            <el-icon>
              <Expand/>
            </el-icon>
        </el-tooltip>
      </div>

      <el-tooltip
          effect="dark"
          content="新建对话"
          placement="right-end"
      >
          <div class="slider-content-item">
            <el-icon>
              <ChatDotSquare/>
            </el-icon>
          </div>
      </el-tooltip>


    </div>
    <div class="slider-footer">
      <el-popover
          placement="top-start"
          trigger="click"
          style="padding: 0"
      >
        <template #reference>
          <img src="https://placehold.co/40x40" alt="Footer Image">
        </template>
        <div >
          <div class="avatar-item">
            <el-icon class="icon"><User /></el-icon>
            <span >123****4567</span>
          </div>
          <div class="avatar-item">
            <el-icon class="icon"><Setting /></el-icon>
            <span >系统设置</span>
          </div>
          <div  class="avatar-item">
            <el-icon  class="icon"><Delete /></el-icon>
            <span>删除所有对话</span>
          </div>
          <div class="avatar-item">
            <el-icon class="icon"><Message /></el-icon>
            <span >联系我们</span>
          </div>
          <div  class="avatar-item">
            <el-icon class="icon"><SwitchButton /></el-icon>
            <span >退出登录</span>
          </div>
        </div>
      </el-popover>
    </div>
  </div>


</template>

<script setup>
import {ref} from "vue";

const popoverContent = ref(``);
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  background-color: #f9fbfe;
  position: fixed;
  left: 0;
  top: 0;
  width: 60px;
  height: 100vh;
  z-index: 1000;

  .slider-logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin: 20px 0;
      width: 40px;
      height: 40px;
      background-color: aqua;
      border-radius: 50%;
    }
  }

  .slider-content {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .slider-content-item {
      font-size: 21px;
      cursor:pointer;
    }
  }

  .slider-footer {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: auto;
    justify-content: end;
    align-items: center;

    img {
      margin: 20px 0;
      width: 40px;
      height: 40px;
      background-color: aqua;
      border-radius: 50%;

    }

  }


}
.avatar-item{
  display: flex;
  align-items: center;
  border-bottom:1px solid #ccc;

  height: 40px;
}
.avatar-item:last-child{
  display: flex;
  align-items: center;
  border-bottom: 0;
  height: 40px;
}
.icon{
  margin-right: 10px;
  font-size: 16px;
}

</style>
