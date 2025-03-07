<script setup>
import Slider from "@/components/Slider.vue";
import ChatUI from '@/components/ChatUI.vue'
</script>

<template>
  <div class="chatWindow">
    <Slider/>
    <ChatUI/>
  </div>
</template>

<style lang="scss" scoped>
.chatWindow {
  display: flex;
}
</style>
