import { createI18n } from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

// 优先读取本地存储，无存储默认英文
const locale = localStorage.getItem('siteLang') || 'en'

const i18n = createI18n({
  legacy: false,
  locale,
  messages: {
    zh,
    en
  }
})

export default i18n