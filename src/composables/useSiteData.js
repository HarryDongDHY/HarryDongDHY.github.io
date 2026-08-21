import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhData from '../data/site-zh.json'
import enData from '../data/site-en.json'

export function useSiteData() {
  const { locale } = useI18n()

  const siteData = computed(() => {
    return locale.value === 'en' ? enData : zhData
  })

  return {
    aboutList: computed(() => siteData.value.about),
    newsList: computed(() => siteData.value.news),
    projectList: computed(() => siteData.value.project),
    pubList: computed(() => siteData.value.pub),
    patentList: computed(() => siteData.value.patent), // 新增专利数据
    honorList: computed(() => siteData.value.honor),
    lifeList: computed(() => siteData.value.life),
    contactList: computed(() => siteData.value.contact)
  }
}