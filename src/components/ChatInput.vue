<script setup>
import { ref } from 'vue';

const inputContent = ref('');
</script>
<template>
  <div class="input-box-container">
    <el-input
        type="textarea"
        :rows="4"
        placeholder="输入你的问题，帮你深度解答"
        v-model="inputContent"
        class="input-box"
        resize="none"
    />

    <div class="input-box-buttons">
      <div class="input-box-left-button">
        <el-button type="primary" class="input-box-button" plain>
          <el-icon><Edit /></el-icon>
          k1.5长思考
        </el-button>

        <el-button type="primary" class="input-box-button" plain>
          <el-icon><Search /></el-icon>
           联网搜索
        </el-button>
      </div>

      <div class="input-box-right-buttons">
        <el-button class="input-box-right-button">
          <el-icon><Share /></el-icon>
        </el-button>

        <el-button class="input-box-right-button">
          <el-icon><Microphone /></el-icon>
        </el-button>

        <el-button type="primary" class="input-box-send-button">
          <el-icon><Top /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.input-box-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 20px;
  .input-box {
    font-size: 16px;
    cursor: pointer;

  }

  .input-box-buttons {
    display: flex;
    margin-top: 10px;
    .input-box-left-button{
      width: 90%;
      .input-box-button {
        border: 1px solid #1890ff;
      }
    }



    .input-box-right-buttons {
      display: flex;
      width: 20%;
      justify-content: space-between;

      .input-box-right-button {
        color: #333333;

        &:hover {
          color: #1890ff;
        }
      }

      .input-box-send-button {
        background-color: #1890ff;
        color: #ffffff;
        border: none;
      }
    }
  }
}
.el-button, .el-button.is-round{
  padding: 10px;
}
</style>
