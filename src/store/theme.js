import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('浅色')

  const setTheme = (theme) => {
    currentTheme.value = theme
    if (theme === '深色') {
      document.body.classList.add('theme-dark')
      document.documentElement.classList.add('dark') 
    } else {
      document.body.classList.remove('theme-dark')
      document.documentElement.classList.remove('dark')
    }
  }

  const initTheme = () => {
    setTheme(currentTheme.value)
  }

  return {
    currentTheme,
    setTheme,
    initTheme
  }
}, {
  persist: true 
})