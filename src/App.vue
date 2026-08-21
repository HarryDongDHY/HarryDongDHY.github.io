<template>
  <!-- 这里完整保留你原来的template，一行不动 -->
  <div class="container">
    <!-- Tab栏外层：通栏 → 固定置顶，增加ref + 动态class -->
    <div class="tabs-wrap" ref="tabsWrapRef" :class="{ scrolled: isScrolled }">
      <!-- 左侧组合容器：logo + 名称，打包成一组，点击返回首页 -->
      <div class="header-brand-group" @click="activeTab = 'home'">
        <img class="header-logo" src="/logo.png" alt="logo" />
        <div class="tab-brand">{{ $t('fullName') }}</div>
      </div>

      <div class="tabs">
        <button
          v-for="item in tabList"
          :key="item.key"
          :class="{ tabItem: true, active: activeTab === item.key }"
          @click="activeTab = item.key"
        >
          {{ $t(item.labelKey) }}
        </button>
      </div>

      <div class="lang-switch">
        <button
          :class="{ active: $i18n.locale === 'zh' }"
          @click="changeLang('zh')"
        >
          中文
        </button>
        <button
          :class="{ active: $i18n.locale === 'en' }"
          @click="changeLang('en')"
        >
          English
        </button>
      </div>
    </div>

    <div class="main-wrap">
      <div class="sidebar">
        <img class="avatar" src="/pic/HarryDong.jpg" :alt="$t('avatarAlt')" />
        <div class="name">{{ $t('name') }}</div>
        <div class="bio">{{ $t('bio') }}</div>
        <div class="links">
          <a href="https://github.com/HarryDongDHY" target="_blank">
            <Icon icon="mdi:github" class="link-icon" /> GitHub
          </a>
          <a href="mailto:mp2409035@stu.nau.edu.cn">
            <Icon icon="mdi:email-outline" class="link-icon" /> Email
          </a>
        </div>
      </div>

      <div class="content-wrap">
        <div class="tab-panel">
          <!-- 主页 -->
          <div v-if="activeTab === 'home'" class="panel">
            <h2>{{ $t('home') }}</h2>
            <div v-for="(item, idx) in aboutList" :key="idx" v-html="item.content"></div>
          </div>

          <!-- 新闻 -->
          <div v-if="activeTab === 'news'" class="panel">
            <h2>{{ $t('news') }}</h2>
            <div class="news-card-list">
              <div class="news-card" v-for="(item, idx) in newsList" :key="idx">
                <div class="news-img-wrap">
                  <img class="news-img" :src="item.img" alt="news">
                </div>
                <div class="news-body">
                  <h3 class="news-title">{{ item.title }}</h3>
                  <div class="news-date">{{ item.date }}</div>
                  <p class="news-desc">{{ item.desc }}</p>
                  <a
                    v-if="item.link"
                    class="news-link"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t('viewDetail') }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 项目 -->
          <div v-if="activeTab === 'project'" class="panel">
            <h2>{{ $t('projects') }}</h2>
            <div class="project-card" v-for="(item, idx) in projectList" :key="idx">
              <h3>{{ item.title }}</h3>
              <div style="color:#718096; font-size:15px; margin-bottom:8px;">
                <span v-if="item.projectNo">{{ item.projectNo }} &nbsp;|&nbsp; </span>
                <span v-if="item.role">{{ item.role }} &nbsp;|&nbsp; </span>
                <span v-if="item.time">{{ item.time }}</span>
              </div>
              <p>{{ item.desc }}</p>
            </div>
          </div>

          <!-- 科研成果 -->
          <div v-if="activeTab === 'research'" class="panel">
            <h2>{{ $t('research') }}</h2>
            <section class="research-section">
              <h3 class="research-subtitle">{{ $t('papers') }}</h3>
              <div class="pub-list">
                <div class="project-card" v-for="(item, idx) in pubList" :key="idx">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </section>
            <section class="research-section">
              <h3 class="research-subtitle">{{ $t('patents') }}</h3>
              <div class="pub-list">
                <div class="project-card" v-for="(item, idx) in patentList" :key="idx">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </section>
          </div>

          <!-- 荣誉 -->
          <div v-if="activeTab === 'honor'" class="panel">
            <h2>{{ $t('honor') }}</h2>
            <div class="honor-list-wrap">
              <div class="project-card" v-for="(item, idx) in honorList" :key="idx">
                {{ item.title }}（{{ item.year }}）
              </div>
            </div>
          </div>

          <!-- 个人生活 -->
          <div v-if="activeTab === 'life'" class="panel">
            <h2>{{ $t('life') }}</h2>
            <div class="friend-circle">
              <div class="moment-item" v-for="(item, idx) in lifeList" :key="idx">
                <div class="moment-header">
                  <span class="moment-name">{{ $t('fullName') }}</span>
                </div>
                <div class="moment-content">{{ item.content }}</div>
                <div class="moment-img-wrap" v-if="item.images && item.images.length > 0">
                  <img
                    class="moment-img"
                    v-for="(img, i) in item.images"
                    :key="i"
                    :src="img"
                    alt="life photo"
                    @click="openPreview(item.images, i)"
                  />
                </div>
                <div class="moment-footer">
                  <span class="moment-date">{{ item.date }}</span>
                  <span class="moment-location" v-if="item.location"> &nbsp {{ item.location }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 联系方式 -->
          <div v-if="activeTab === 'contact'" class="panel">
            <h2>{{ $t('contact') }}</h2>
            <div class="contact-card-list">
              <div class="contact-card" v-for="(item, idx) in contactList" :key="idx">
                <div class="contact-label">
                  <Icon :icon="item.icon" class="contact-icon" />
                  {{ item.label }}
                </div>
                <div class="contact-value">
                  <a
                    v-if="item.link"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.value }}
                  </a>
                  <span v-else>{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">{{ $t('footer') }}</div>

    <transition name="preview-fade">
      <div v-if="preview.show" class="preview-overlay" @click.self="closePreview">
        <div class="preview-container">
          <img :src="preview.images[preview.index]" class="preview-img" alt="大图预览" />
          <button class="preview-btn prev" @click.stop="prevImage" v-if="preview.images.length > 1">‹</button>
          <button class="preview-btn next" @click.stop="nextImage" v-if="preview.images.length > 1">›</button>
          <button class="preview-close" @click.stop="closePreview">×</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
// 引入分离后的全局样式
import '@/assets/css/base.css'
import '@/assets/css/layout.css'
import '@/assets/css/components.css'

import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useSiteData } from '@/composables/useSiteData.js'

const { t, locale } = useI18n()
const {
  aboutList,
  newsList,
  projectList,
  pubList,
  patentList,
  honorList,
  lifeList,
  contactList
} = useSiteData()

const tabList = [
  { key: 'home', labelKey: 'tabHome' },
  { key: 'news', labelKey: 'tabNews' },
  { key: 'project', labelKey: 'tabProject' },
  { key: 'research', labelKey: 'tabResearch' },
  { key: 'honor', labelKey: 'tabHonor' },
  { key: 'life', labelKey: 'tabLife' },
  { key: 'contact', labelKey: 'tabContact' },
]

const activeTab = ref(localStorage.getItem('curTab') || 'home')
const changeLang = (lang) => {
  locale.value = lang
  localStorage.setItem('siteLang', lang)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  document.title = t('title')
}
watch(activeTab, () => localStorage.setItem('curTab', activeTab.value))
document.title = t('title')
document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : 'en'

const preview = ref({
  show: false,
  images: [],
  index: 0
})
const openPreview = (images, idx) => {
  preview.value = { show: true, images, index: idx }
  document.body.style.overflow = 'hidden'
}
const closePreview = () => {
  preview.value.show = false
  document.body.style.overflow = ''
}
const prevImage = () => {
  preview.value.index = preview.value.index <= 0 ? preview.value.images.length - 1 : preview.value.index - 1
}
const nextImage = () => {
  preview.value.index = preview.value.index >= preview.value.images.length - 1 ? 0 : preview.value.index + 1
}
const handleKeydown = (e) => {
  if (e.key === 'Escape') closePreview()
}

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const tabsWrapRef = ref(null)
const setContainerPadding = () => {
  if (!tabsWrapRef.value) return
  const height = tabsWrapRef.value.offsetHeight
  const container = document.querySelector('.container')
  if (container) {
    container.style.paddingTop = `${height + 20}px`
  }
}

onMounted(async () => {
  await nextTick()
  setContainerPadding()
  window.addEventListener('resize', setContainerPadding)
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('resize', setContainerPadding)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', handleScroll)
})
</script>