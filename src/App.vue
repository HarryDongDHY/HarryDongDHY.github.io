<template>
  <div class="container">
    <!-- Tab栏外层：通栏 -->
    <div class="tabs-wrap">
      <div class="tab-brand">{{ $t('fullName') }}</div>
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
          <a href="https://github.com/HarryDongDHY" target="_blank">GitHub</a>
          <a href="mailto:mp2409035@stu.nau.edu.cn">Email</a>
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
                  <!-- 新增：查看详情链接 -->
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

          <!-- 项目【增加角色、时间、编号字段展示】 -->
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

          <!-- 科研成果：论文 + 专利（原publication改为research） -->
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

          <!-- 荣誉【改造：每条独立卡片，和项目卡片样式统一】 -->
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

    <!-- ========== 全局图片预览弹窗 ========== -->
    <transition name="preview-fade">
      <div v-if="preview.show" class="preview-overlay" @click.self="closePreview">
        <div class="preview-container">
          <img :src="preview.images[preview.index]" class="preview-img" alt="大图预览" />
          <!-- 左右切换按钮 -->
          <button class="preview-btn prev" @click.stop="prevImage" v-if="preview.images.length > 1">‹</button>
          <button class="preview-btn next" @click.stop="nextImage" v-if="preview.images.length > 1">›</button>
          <button class="preview-close" @click.stop="closePreview">×</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
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

// tab 由 publication 修改为 research
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

// ===================== 图片预览逻辑 =====================
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
// ESC关闭预览
const handleKeydown = (e) => {
  if (e.key === 'Escape') closePreview()
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background-color: #f7f9fc;
  color: #2d3748;
  line-height: 1.75;
  animation: pageEnter 0.6s ease-out;
}
@keyframes pageEnter { from { opacity: 0; } to { opacity: 1; } }

.tabs-wrap {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  min-height: 64px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s ease;
}
.tab-brand {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  white-space: nowrap;
  flex-shrink: 0;
}
.tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  position: relative;
  top: 3px;
}
.tabItem {
  border: none;
  background: transparent;
  padding: 14px 16px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  color: #4a5568;
  transition: all 0.24s ease;
  border-radius: 6px 6px 0 0;
}
.tabItem:hover {
  color: #3182ce;
  background-color: rgba(49, 130, 206, 0.06);
  transform: translateY(-2px);
}
.tabItem.active {
  color: #3182ce;
  border-bottom-color: #3182ce;
  font-weight: 600;
}
.lang-switch {
  display: flex;
  align-items: center;
}
.lang-switch button {
  border: 1px solid #cbd5e0;
  background:#fff;
  padding:5px 14px;
  border-radius:8px;
  cursor:pointer;
  margin-left:8px;
  transition: all 0.24s ease;
}
.lang-switch button:hover:not(.active) {
  border-color:#a0aec0;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(49,130,206,0.12);
}
.lang-switch button.active {
  background-color:#3182ce;
  color:white;
  border-color:#3182ce;
  box-shadow: 0 3px 10px rgba(49,130,206,0.25);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 60px;
}
.main-wrap {
  display: flex;
  gap:48px;
}
.sidebar {
  flex-shrink:0;
  width:260px;
  text-align:center;
}
.content-wrap { flex:1; }

.panel { animation: fadeSlideUp 0.34s ease; }
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  margin-bottom: 22px;
  animation: avatarBreath 4s ease-in-out infinite;
}
@keyframes avatarBreath {
  0% { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12); }
  50% { box-shadow: 0 8px 24px rgba(49,130,206,0.18); }
  100% { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12); }
}
.name { font-size: 34px; font-weight: 700; margin-bottom: 10px; color:#1a202c; }
.bio { font-size: 17px; color: #4a5568; }
.links { margin-top: 24px; }
.links a {
  display: inline-block;
  margin: 0 10px;
  color: #3182ce;
  text-decoration: none;
  padding:4px 0;
  position:relative;
  transition: all 0.24s ease;
}
.links a::after{
  content:'';
  position:absolute;
  left:0;
  bottom:0;
  width:0;
  height:2px;
  background:#3182ce;
  transition: width 0.3s ease;
}
.links a:hover::after{ width:100%; }
.links a:hover { color:#2b6cb0; transform: translateY(-1px); }

.panel h2 {
  font-size: 23px;
  margin-bottom: 20px;
  border-left: 5px solid #3182ce;
  padding-left: 14px;
  color:#1a202c;
}
.panel p { color:#374151; font-size:16px; }
.panel ul { color:#374151; font-size:16px; }
.panel li { margin-bottom:10px; }

/* 科研成果子标题 */
.research-section { margin-bottom:32px; }
.research-subtitle {
  font-size:19px;
  margin:16px 0 12px;
  color:#2d3748;
}

/* 通用卡片样式：项目/论文/专利/荣誉共用一套规范 */
.project-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  transition: all 0.28s ease;
}
.project-card:hover{
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.project-card h3 { margin-bottom: 8px; font-size:18px; color:#1a202c; }
.project-card p { color: #4a5568; font-size: 15.5px; }

/* 论文、专利列表容器，控制间距 */
.pub-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
/* 荣誉列表容器 */
.honor-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-card-list { display: flex; flex-direction: column; gap: 24px; }
.news-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  overflow: hidden;
  transition: all 0.28s ease;
}
.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.news-img-wrap { flex-shrink: 0; width: 220px; }
.news-img { width: 100%; height: 100%; object-fit: cover; }
.news-body { padding: 20px; }
.news-title { font-size: 18px; color:#1a202c; margin-bottom: 6px; }
.news-date { font-size:14px; color:#718096; margin-bottom:10px; }
.news-desc { font-size:15.5px; color:#4a5568; }
/* 新闻详情链接 */
.news-link {
  display: inline-block;
  margin-top: 8px;
  color: #3182ce;
  text-decoration: none;
}
.news-link:hover {
  text-decoration: underline;
}

/* ========== 朋友圈样式 ========== */
.friend-circle {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 520px;
}
.moment-item {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  transition: all 0.28s ease;
}
.moment-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.moment-name { font-weight: bold; font-size: 16px; color: #2d3748; }
.moment-content { margin: 10px 0; line-height: 1.7; color: #2d3748; }
.moment-img-wrap { display: grid; gap: 8px; }
.moment-img-wrap:has(> img:nth-child(1):last-child) { grid-template-columns: 1fr; max-width: 260px; }
.moment-img-wrap:has(> img:nth-child(2):last-child),
.moment-img-wrap:has(> img:nth-child(3):last-child),
.moment-img-wrap:has(> img:nth-child(4):last-child) { grid-template-columns: repeat(2, 1fr); }
.moment-img-wrap:has(> img:nth-child(5)) { grid-template-columns: repeat(3, 1fr); }
.moment-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 6px;
  cursor: zoom-in;
  transition: opacity 0.2s;
}
.moment-img:hover { opacity: 0.85; }
.moment-footer { margin-top: 10px; font-size: 13px; color: #718096; }

/* ========== 图片全屏预览弹窗 ========== */
.preview-fade-enter-from, .preview-fade-leave-to { opacity: 0; }
.preview-fade-enter-active, .preview-fade-leave-active { transition: opacity 0.25s ease; }
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 24px;
}
.preview-container { position: relative; max-width: 90vw; max-height: 90vh; }
.preview-img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 4px; }
.preview-close {
  position: absolute;
  top: -36px;
  right: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  width: 32px;
  height: 32px;
}
.preview-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size:22px;
  cursor: pointer;
}
.preview-btn.prev { left: -54px; }
.preview-btn.next { right: -54px; }

/* ========== 联系方式卡片 ========== */
.contact-card-list { display: flex; flex-direction: column; gap: 16px; }
.contact-card {
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  transition: all 0.28s ease;
}
.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.contact-label {
  font-size: 14px;
  color: #718096;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.contact-icon { font-size: 18px; color:#3182ce; }
.contact-value { font-size: 16px; color: #2d3748; }
.contact-value a {
  color: #3182ce;
  text-decoration: none;
  position: relative;
}
.contact-value a::after{
  content:'';
  position:absolute;
  left:0;
  bottom:0;
  width:0;
  height:2px;
  background:#3182ce;
  transition: width 0.3s ease;
}
.contact-value a:hover::after{ width:100%; }
.contact-value a:hover { color:#2b6cb0; }

.footer {
  text-align: center;
  margin-top: 70px;
  color: #718096;
  font-size: 14px;
}

/* ========== 移动端适配 ========== */
@media(max-width:768px){
  .tabs-wrap {
    grid-template-columns: 1fr;
    gap:12px;
    min-height: auto;
    padding:12px 20px;
  }
  .tabs { justify-content: flex-start; flex-wrap: wrap; top:0; }
  .lang-switch { justify-self: flex-start; }
  .main-wrap{ flex-direction:column; gap:36px; }
  .sidebar{ width:100%; }
  .tabItem{ padding:12px 14px; }
}
@media(max-width:640px){
  .news-card { flex-direction: column; }
  .news-img-wrap { width:100%; height:180px; }
  .friend-circle { max-width: 100%; }
  .moment-img-wrap:has(> img:nth-child(1):last-child) { max-width: 100%; }
  .preview-btn.prev { left: 8px; }
  .preview-btn.next { right: 8px; }
}
</style>